const BASE_URL = "http://localhost:3000"
import axios from 'axios';


export const getEvents = async () =>{
    const response = await fetch(`${BASE_URL}/api/Events`);
    const json = await response.json();
    return json;
}

export const getEvent = async (eventId) =>{
    const response = await fetch(`${BASE_URL}/api/Events/${eventId}`);
    const json = await response.json();
    if(json) return json
    return {};
}

export async function addEvent(formData) {
  try {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(formData),
      url: `${BASE_URL}/api/Events`,
    };

    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateEvent(eventId, formData){
    const Options ={
        method : 'PUT',
        headers : {'Content-Type': "application/json"},
        body: JSON.stringify(formData)
      }
     const response = await fetch(`${BASE_URL}/api/Events/${eventId}`, Options)
    const json = await response.json()
     return json;
}

export async function patchEvent(eventId, formData) {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      };
    
      const response = await fetch(`${BASE_URL}/api/Events/${eventId}`, options);
      const data = await response.json();
    
      return data;
}

export async function deleteEvent(eventId){
    const Options ={
        method : 'DELETE',
        headers : {'Content-Type': "application/json"},
    }
  const response = await fetch(`${BASE_URL}/api/Events/${eventId}`, Options)
  const json = await response.json()
  return json;
}


export const getGestios = async () =>{
    const response = await fetch(`${BASE_URL}/api/Gestionaire`);
    const json = await response.json();
    return json;
}

export const getGestio = async (gestioId) =>{
    const response = await fetch(`${BASE_URL}/api/Gestionaire/${gestioId}`);
    const json = await response.json();
    if(json) return json
    return {};
}



export async function addGestio(formData) {
  try {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(formData),
      url: `${BASE_URL}/api/Gestionaire`,
    };

    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(error);  
    throw error;
  }
}


export async function updateGestio(gestioId, formData){
    const Options ={
        method : 'PUT',
        headers : {'Content-Type': "application/json"},
        body: JSON.stringify(formData)
      }
     const response = await fetch(`${BASE_URL}/api/Gestionaire/${gestioId}`, Options)
    const json = await response.json()
     return json;
    }


export async function deleteGestio(gestioId){
    const Options ={
        method : 'DELETE',
        headers : {'Content-Type': "application/json"},
    }
  const response = await fetch(`${BASE_URL}/api/Gestionaire/${gestioId}`, Options)
  const json = await response.json()
  return json;
}

//Partenaire

export const getParts = async () =>{
  const response = await fetch(`${BASE_URL}/api/Partenaire`);
  const json = await response.json();
  return json;
}

export const getPart = async (partId) =>{
  const response = await fetch(`${BASE_URL}/api/Partenaire/${partId}`);
  const json = await response.json();
  if(json) return json
  return {};
}



export async function addPart(formData) {
try {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(formData),
    url: `${BASE_URL}/api/Partenaire`,
  };

  const response = await axios(options);
  return response.data;
} catch (error) {
  console.error(error); 
  throw error; 
}
}


export async function updatePart(partId, formData){
  const Options ={
      method : 'PUT',
      headers : {'Content-Type': "application/json"},
      body: JSON.stringify(formData)
    }
   const response = await fetch(`${BASE_URL}/api/Partenaire/${partId}`, Options)
  const json = await response.json()
   return json;
  }


export async function deletePart(partId){
  const Options ={
      method : 'DELETE',
      headers : {'Content-Type': "application/json"},
  }
const response = await fetch(`${BASE_URL}/api/Partenaire/${partId}`, Options)
const json = await response.json()
return json;
}


export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/api/Categorie`);
  const json = await response.json();
  return json.categories; 
};




export async function addCategorie(formData) {
  try {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(formData),
      url: `${BASE_URL}/api/Categorie`,
    };
  
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(error); 
    throw error; 
  }
  }


  export async function deleteCategorie(catName) {
    const Options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(`${BASE_URL}/api/Categorie?catName=${encodeURIComponent(catName)}`, Options);
    const json = await response.json();
    return json;
  }
  