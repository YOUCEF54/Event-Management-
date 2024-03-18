import { useState, useEffect } from "react";
import Select from "react-select";
import { useQuery, useQueryClient } from 'react-query';
import { getCategories,deleteCategorie } from "../libs/helper";
import { useRouter } from "next/router";
import { components } from 'react-select';
import { AiOutlineDelete } from 'react-icons/ai';
import { useSelector } from "react-redux";

const DropDownV2 = ({ onSelectChange,status }) => {

  const queryClient = useQueryClient()
  const { isLoading, isError, data, error } = useQuery("Categories", getCategories);
  const [selectedOption, setSelectedOption] = useState(null);
  let isChanged = useSelector(state => state.app.client.isChanged)
  const [change,setChange] = useState(false)

  useEffect(() => {
      queryClient.invalidateQueries("Categories"); 
    
  }, [status]);
  
    
  const handleDeleteCategory = async (catName) => {
    try {
      console.log("caategory name : "+catName )
      const response = await deleteCategorie(catName);
      await queryClient.prefetchQuery("Categories", getCategories);
      
      // console.log(response);
  
      if (response.deleted) {
        console.log('Category deleted successfully');
      } else {
        console.error('Delete error:', response.error);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };
    


  useEffect(() => {
    
    if (data && data.length > 0) {
      setSelectedOption({ value: data[0], label: data[0] }); // Set the initial selected option
    }
  }, [data]);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onSelectChange(selectedOption);
  };

  // Custom styles for react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "1px solid #686C75" : "1px solid #9CA3AF",
      borderRadius: ".4rem",
      boxShadow: state.isFocused ? "" : "none",
      "&:hover": {
        border: "1px solid #686C75",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#E5E7EB" : "white",
      color: state.isFocused ? "#111827" : "#4B5563",
      "&:hover": {
        backgroundColor: "#ddd",
        color: "#111827",
      },
    }),
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>aucune catégorie disponible</div>;
  }

  const OptionWithButton = (props) => (
    <div className="bg-transparent justify-end flex">
      <components.Option {...props}>{props.label}</components.Option>
      <AiOutlineDelete onClick={() => handleDeleteCategory(props.label)} className="absolute rounded-full w-6 cursor-pointer  mr-3  h-10" />
    </div>
  );
  
// const test = async(e)=>{
//   e.preventDefault()
//   setChange(!change)
//   console.log(isChanged)
// }
  return (
    <div>
      {/* <button onClick={test}>click</button> */}
    <Select
      options={data?.map((e) => ({
        value: e,
        label: e,
      }))}
      components={{ Option: OptionWithButton }} // Use the custom Option component
      value={selectedOption}
      onChange={handleSelectChange}
      styles={customStyles}
    />
    
  </div>
  );
};

export default DropDownV2;
