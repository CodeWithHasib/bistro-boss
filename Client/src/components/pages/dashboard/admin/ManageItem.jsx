import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../shared/SectionTitle';
import { Pagination, Stack } from '@mui/material';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const ManageItem = () => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(result => {
                setMenu(result)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);

    const itemPerPage = 8;
    const totalItem = menu.length;
    const pageCount = Math.ceil(totalItem / itemPerPage);

    useEffect(() => {
        const start = (currentPage - 1) * itemPerPage;
        const end = currentPage * itemPerPage;
        setData(menu.slice(start, end))
    }, [currentPage, menu])

    const handelPageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/menu/${id}`);
            const updatedMenu = menu.filter((item) => item._id !== id);
            setMenu(updatedMenu); // Update the menu state
            setData(updatedMenu); // Update the data state
            alert('Item deleted successfully');
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    if (loading) {
        return <div className="">
            <h1>Loading.....</h1>
        </div>
    }

    return (
        <div>
            <div className="my-10">
                <SectionTitle title="Hurry up" body="MANAGE ALL ITEM" />
            </div>
            <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="bg-[#D1A054]">
                            <th className="w-[10%] py-4 pl-6 pr-2 text-left text-white font-bold uppercase"></th>
                            <th className="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">Photo</th>
                            <th className="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">Item name</th>
                            <th className="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">Price</th>
                            <th className="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">Update</th>
                            <th className="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">delete</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white overflow-y-auto">
                        {data.map((item, index) => {
                            const itemIndex = (currentPage - 1) * itemPerPage + index + 1;
                            return (
                                <tr key={item._id}>
                                    <td className="py-4 pl-6 pr-2 border-b border-gray-200">{itemIndex}</td>
                                    <td className="py-4 px-6 border-b border-gray-200 truncate">
                                        <img src={item.image} className="h-[60px] w-[60px] " alt="" />
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200 truncate">{item.name}</td>
                                    <td className="py-4 px-6 border-b border-gray-200 truncate">{item.price}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        <span onClick={()=>navigate(`/dashboard/update-item/${item._id}`)} className="bg-[#D1A054] cursor-pointer text-white py-1 px-2 rounded-full text-xs">Update</span>
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        <span onClick={() => handleDelete(`${item._id}`)} className="bg-green-500 cursor-pointer text-white py-1 px-2 rounded-full text-xs">Delete</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Stack spacing={2}>
                    <Pagination onChange={handelPageChange} count={pageCount} color="primary" />
                </Stack>
            </div>
        </div>
    );
};

export default ManageItem;
