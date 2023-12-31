import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
const UpdateRestaurant = (props) => {
    // we need id of the restaurant that we are trying to update
    let navigate = useNavigate();
    const {id} = useParams();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange , setpriceRange] = useState("");

    useEffect(() => {
        const fetchData = async() => {
            const response = await RestaurantFinder.get(`/${id}`);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setpriceRange(response.data.data.restaurant.price_range);
        };
        fetchData();
    },[id, setName,setLocation,setpriceRange])

    const handleSubmit = async (e) => {
        //when submit a form always stop html from reloading the entire page.
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            // pass the date back to the api
            name,
            location,
            price_range: priceRange
        });
        navigate('/');
        console.log(updatedRestaurant);
    }
  return (
    <div> 
        <form>
            <div className="form-group"> 
                <label htmlFor="name">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)}id="name"  className="form-control" type="text" />
            </div>
            <div className="form-group"> 
                <label htmlFor="name">Location</label>
                <input value={location} onChange={(e) => setLocation(e.target.value)}id="location"  className="form-control" type="text" />
            </div>
            <div className="form-group"> 
                <label htmlFor="price_range">Price Range</label>
                <input value={priceRange} onChange={(e) => setpriceRange(e.target.value)}id="price_range"  className="form-control" type="number" />
            </div>
            <button type="submit" onClick={handleSubmit} className='btn btn-primary'>Submit</button>
        </form>
    </div>
  );
};

export default UpdateRestaurant;