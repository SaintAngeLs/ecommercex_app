import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { useState } from "react";
import styled from "styled-components";


const FilterWrapper = styled.div`
    display: flex;
    gap: 15px;
`;

const CategoryTitleHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1{
    font-size:1.5em;
    }
`;

const Filter = styled.div`
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  color:#444;
  select{
    background-color:transparent;
    border:0;
    font-size:inherit;
    color:#444;
  }
`;


export default function CategoryPage({category, subCategories, products}){

    const defaultSortingValue = '_id-desc';
    const [sort,setSort] = useState(defaultSortingValue);
    const [filtersChanged,setFiltersChanged] = useState(false);
    const [filtersValues,setFiltersValues] = useState(defaultFilterValues);
    const [loadingProducts,setLoadingProducts] = useState(false);


    return (
        <>
            <Header/>
            <Center>
                <CategoryTitleHeader>
                    <h1>{category.name}</h1>
                    <FilterWrapper>
                        {category.properties.map(property => (
                            <Filter key = {property.name}>
                                <span>{property.name}</span>
                                <select onChange={event => handleFilterChange(prop.name, event.target.value)}
                                    value={filtersValues?.find(filteredVal => filteredVal.name === prop.name).value}>
                                    <option value="all">All</option>
                                    {prop.values.map(val => (
                                        <option key={val} value={val}>{val}</option>
                                    ))}
                                </select>
                            </Filter>
                        ))}

                        <Filter>
                            <span>Sort:</span>
                            <select value={sort}
                                onChange={ev => {
                                setSort(ev.target.value);
                                setFiltersChanged(true);
                                }}>
                                <option value="price-ascending">price, lowest first</option>
                                <option value="price-descending">price, highest first</option>
                                <option value="_id-descending">newest first</option>
                                <option value="_id-ascending">oldest first</option>
                            </select>
                        </Filter>
                    </FilterWrapper>
                </CategoryTitleHeader>

                {loadingProducts && (
            <Spinner fullWidth />
            )}
            {!loadingProducts && (
            <div>
                {products.length > 0 && (
                <ProductsGrid products={products} />
                )}
                {products.length === 0 && (
                <div>Sorry, no products found</div>
                )}
            </div>
            )}
            
            </Center>
        </>
    );
}


export async function getServerSideProps(context) {
    const category = await Category.findById(context.query.id);
    const subCategories = await Category.find({parent:category._id});

    const categoryIds = [category._id, ...subCategories.map(category => category._id)];
    const products = await Product.find({category:categoryIds});

    return {
        props:{
          category: JSON.parse(JSON.stringify(category)),
          subCategories: JSON.parse(JSON.stringify(subCategories)),
          products: JSON.parse(JSON.stringify(products)),
        }
      };
}