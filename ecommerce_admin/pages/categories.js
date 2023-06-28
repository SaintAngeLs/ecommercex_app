import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2';
import { Tree } from 'react-d3-tree';

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [hierarchicalCategories, setHierarchicalCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get('/api/categories').then(result => {
        console.log(result);
        const hierarchy = createHierarchy(result?.data, null);
        if (hierarchy.length === 0) {
          setHierarchicalCategories([]);
        } else {
          setHierarchicalCategories(hierarchy);
        }
        setCategories(result.data);
      });
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map(property => ({
        name: property.name,
        values: property.values.split(','),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put('/api/categories', { ...data, _id: editedCategory._id });
      setEditedCategory(null);
    } else {
      await axios.post('/api/categories', data);
    }

    setName('');
    setParentCategory('');
    setProperties([]);
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parentCategory?._id);
    setProperties(category.properties.map(({ name, values }) => ({
      name,
      values: values.join(','),
    })));
  }

  function deleteCategory(category) {
    swal.fire({
      title: 'Are you sure?',
      text: `Don you want do delete the category "${category.name}"?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, DELETE!',
      confirmButtonColor: '#FF0000',
      reverseButtons: true,
      didOpen: () => {
        // run when swal is opened...

      },
      didClose: () => {
        // run when swal is closed...
      }
    }).then(async result => {
      // when confirmed and promise resolved...
      if (result.isConfirmed) {
        const { _id } = category;
        await axios.delete('/api/categories?_id=' + _id);
        fetchCategories();
      }
    }).catch(error => {
      // when promise rejected...
    });
  }

  function addProperty() {
    setProperties(previous => {
      return [...previous, { name: '', values: '' }];
    });
  }

  function PropertyNameChangeHandler(index, property, newName) {
    setProperties(previous => {
      const properties = [...previous];
      properties[index].name = newName;
      return properties;
    });
  }

  function PropertyValuesChangeHandler(index, property, newValues) {
    setProperties(previous => {
      const properties = [...previous];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToBeRemoved) {
    setProperties(previous => {
      return [...previous].filter((property, propertyIndex) => {
        return propertyIndex !== indexToBeRemoved;
      });
    });
  }

  function createHierarchy(categories, parentCategoryId) {
    const root = {
        name: "Categories",
        children: []
      };
      
      categories.forEach(category => {
        if (category.parentCategory?._id === parentCategoryId) {
          const children = createHierarchy(categories, category._id);
          const node = {
            name: category.name,
          };
          if (children.length > 0) {
            node.children = children;
          }
          root.children.push(node);
        }
      });
    
      return [root];
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>{editedCategory ? `Edit category "${editedCategory.name}"` : `Create new category`}</label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-2">
          <input type="text" placeholder={'Category name'} onChange={event => {
            setName(event.target.value);
          }} value={name} />
          <select value={parentCategory} onChange={event => setParentCategory(event.target?.value || '')}>
            <option value="">No parent category</option>
            {categories.length > 0 && categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button type="button" className="button-default text-sm mb-3" onClick={addProperty}>Add new property</button>
          {properties.length > 0 && properties.map((property, index) => (
            <div className="flex gap-1 mb-3">
              <input className="mb-0" type="text" value={property.name} onChange={event => PropertyNameChangeHandler(index, property, event.target.value)} placeholder="property name (ex: color)" />
              <input className="mb-0" type="text" value={property.values} onChange={event => PropertyValuesChangeHandler(index, property, event.target.value)} placeholder="values, separated with comma" />
              <button onClick={() => removeProperty(index)} type="button" className="button-red">Remove</button>
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button type="button" className="button-default" onClick={() => {
              setEditedCategory(null);
              setName('');
              setParentCategory('');
              setProperties([]);
            }
            }>Cancel</button>
          )}
          <button type="submit" className="button-primary-version py-1">Save</button>
        </div>
      </form>

      {!editedCategory && (
        <>
          <table className="basic-table-products mt-5">
            <thead>
              <tr>
                <td>Category Name</td>
                <td>Parent Category</td>
                <td>Parent Category</td>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 && categories.map(category => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category?.parentCategory?.name}</td>
                  <td>
                    <div className="flex gap-2 mr-0">
                      <button onClick={() => {
                        editCategory(category)
                      }}
                        className="button-default">Edit</button>
                      <button
                        onClick={() => deleteCategory(category)}
                        className="button-red">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* {hierarchicalCategories.length > 0 && (
            <div className="mt-5">
              <h2>Category Hierarchy</h2>
              <div style={{ height: '500px' }}>
                <Tree data={hierarchicalCategories} />
              </div>
            </div>
          )}
          {hierarchicalCategories.length === 0 && (
            <div className="mt-5">
              <h2>Category Hierarchy is empty</h2>
            </div>
          )} */}
        </>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => (
  <Categories swal={swal} />
));
