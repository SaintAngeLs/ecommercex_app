import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./Spinner"
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({_id, title:existingTitle, description:existingDescription, price:existingPrice, images:existingImages, category:existingCategory, properties:assignedProperties}) 
{
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrise] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [categories,  setCategories] = useState([]);
    const [category, setCategory] = useState(existingCategory || '');
    const [productProperties, setProductProperties] = useState(assignedProperties || {});
    const router = useRouter();
    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }, [])
    async function saveProduct(event)
    {
        const data = {title, description, price, images, category, properties:productProperties};
        event.preventDefault();
        if(_id)
        {
            //update the product
            await axios.put('/api/products', {...data,_id});
        }
        else
        {
            // create new one product
            await axios.post("/api/products", data);
        }
        setGoToProducts(true);
        
    }
    if(goToProducts)
    {
        router.push('/products')
    }
    async function uploadImages(event) {
        const files = event.target?.files;
        // apply if there is at least one image
        if(files?.length > 0)
        {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files)
            {
                data.append('file', file);
                
            }
            const res = await axios.post('/api/upload', data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            })
            setIsUploading(false);
        }
    }
    function updateImagesOrder(images) {
        setImages(images);
    }

    const propertiesToFill = [];

    if(categories.length > 0 && category)
    {
        // fund the selecated categoru in select

        let selectedCategoryInfo = categories.find(({_id}) => _id === category);

        //grab all the properties in the selecated category

        propertiesToFill.push(...selectedCategoryInfo.properties);

        // in case to be sure that the properties of the parent category are actually visible
        // if selected category has a parent id => than this selecatedf category has a parent

        while(selectedCategoryInfo?.parentCategory?._id)
        {
            const parentCategory = categories.find(({_id}) => _id === selectedCategoryInfo?.parentCategory?._id);
            propertiesToFill.push(...parentCategory.properties);
            selectedCategoryInfo = parentCategory;
        }
    }
    function setProductProperty(propertyName, propertyValue)
    {
        setProductProperties(previous => {
            const newProductProperties = {...previous};
            newProductProperties[propertyName] = propertyValue;
            return newProductProperties;
        })
    }

    return (
        <form onSubmit={saveProduct}>
            <label>Product name</label>
            <input type = "text" placeholder="product name" value = {title} onChange = { ev => setTitle(ev.target.value) }/>
            <label>Category</label>
            <select value = {category} onChange={event => setCategory(event.target.value)}>
                <option value = "">Uncategorized</option>
                {categories.length > 0 && categories.map(category => (
                    <option value = {category._id}>{category.name}</option>
                ))}
            </select>
            {propertiesToFill.length > 0 && propertiesToFill.map(property => (
                <div className="">
                    <label>{property.name[0].toUpperCase() + property.name.substring(1)}</label>
                    <select value={productProperties[property.name]} 
                            onChange={event => 
                            setProductProperty(property.name, event.target.value)
                            }>
                        {property.values.map(value => (
                            <option value = {value}>{value}</option>
                        ))}
                    </select>
                </div>
            ))}
            <label>
                Photos
            </label>
            <div className="mb-2 flex flex-wrap gap-3">
                <ReactSortable className="flex flex-wrap gap-3" list = {images} setList={updateImagesOrder}>
                {!!images?.length && images.map(link => {
                    return(
                        <div key = {link} className="h-40 bg-white p-5 shadow-sm rounded-smborder border-gray-200">
                            <img src={link} className="rounded-lg"/>
                        </div>
                    );
                })}
                </ReactSortable>
                {isUploading && (
                    <div className="h-40 p-1 flex flex-col text-center rounded-lg">
                        <Spinner/>
                    </div>
                )}
                <label className="w-40 h-40 cursor-pointer text-center text-primary flex flex-col justify-center items-center text-sm gap-2 rounded-sm bg-white shadow-sm border border-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
</svg>
                <div>
                    Upload image
                </div>
                <input type = "file" multiple onChange = {uploadImages} className="hidden"/>
                </label>
                {!images?.length && (
                 <div>No photos in this product</div>   
                )}
            </div>
            <label>Description</label>
            <textarea placeholder = "description" value = {description} onChange = {ev => setDescription(ev.target.value) }/>
            <label>Price (in EUR)</label>
            <input type = "number" placeholder="price" value = {price} onChange={ ev => setPrise(ev.target.value) }/>
            <button type = "submit" className="button-primary-version">Save</button>
        </form> 
    )
}