import React, { useState } from 'react';
import SerieOrderForm from './SerieOrderForm.js';

const SeriesForm = ({ serieData, setSerieData }) => {
  const { serie_name, is_featured, poster } = serieData;
  const [orderForms, setOrderForms] = useState([]);
  const [orderFormCount, setOrderFormCount] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSerieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddOrderForm = () => {
    const newOrderForm = {
      id: orderFormCount,
      order_type: 'Release',
      seriesOrderItems: [
        {
          order: null,
          fromEpisode: null,
          toEpisode: null,
          anime: {
            title: null,
            description:
              'No description available yet. Check back later!',
            release_date: null,
            is_dubbed: null,
            optional: null,
            poster: null,
            banner: null,
            type: null,
            genres: [],
            episodes: [
              {
                episode_number: null,
                is_filler: null,
              },
            ],
          },
        },
      ],
    };

    setOrderForms((prevForms) => [...prevForms, newOrderForm]);
    setSerieData((prevData) => ({
      ...prevData,
      seriesOrder: [...prevData.seriesOrder || [], newOrderForm],
    }));

    setOrderFormCount((prevCount) => prevCount + 1);
  };

  const handleRemoveOrderForm = (formId) => {
    setOrderForms((prevForms) =>
      prevForms.filter((form) => form.id !== formId)
    );

    setSerieData((prevData) => ({
      ...prevData,
      seriesOrder: prevData.seriesOrder.filter((form) => form.id !== formId),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create the series object
    const seriesObject = {
      serie_id: serieData.serie_id,
      serie_name: serieData.serie_name,
      is_featured: serieData.is_featured,
      poster: serieData.poster,
      seriesOrder: orderForms,
      animes: serieData.animes,
    };

    // Perform your submit action with the seriesObject
    console.log(seriesObject);
  };

  const handleUpdateOrderForm = (formId, updatedData) => {
    console.log(formId, updatedData);
    setOrderForms((prevForms) =>
      prevForms.map((form) => {
        if (form.id === formId) {
          return updatedData;
        }
        return form;
      })
    );

    setSerieData((prevData) => ({
      ...prevData,
      seriesOrder: prevData.seriesOrder.map((form) => {
        if (form.id === formId) {
          return updatedData;
        }
        return form;
      }),
    }));
  };

  console.log(serieData);

  return (
    <form onSubmit={handleSubmit} className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 justify-items-start items-center'>
      <label className='block text-sm font-medium leading-6 w-full sm:col-span-3'>
        Serie Name:
        <input
          type="text"
          name="serie_name"
          placeholder={serie_name}
          value={serieData.serie_name || ''}
          onChange={handleChange}
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-7 bg-transparent
          ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-btn 
          text-white  placeholder:text-gray-400  sm:text-sm sm:leading-6"
        />
      </label>
      <label className="relative inline-flex items-center cursor-pointer text-sm font-medium leading-6 w-2/4 sm:col-span-3">
        <input type="checkbox"
          checked={is_featured}
          value={is_featured}
          onChange={(event) =>
            setSerieData((prevData) => ({
              ...prevData,
              is_featured: event.target.checked,
            }))
          }
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Featured</span>
      </label>
      <div className='sm:col-span-3'>
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 w-full">
            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          {/* TODO Fix this */}
          <input id="dropzone-file" type="file" className="hidden" value={""}
            onChange={(event) =>
              setSerieData((prevData) => ({
                ...prevData,
                poster: "poster.webp",
              }))
            }
          />
        </label>
      </div>
      <div className='col-span-6'>
        {orderForms.map((form, index) => (
          <SerieOrderForm
            key={`${form.order_type}-${index}`}
            serieData={form}
            orderForms={orderForms} // Add this prop
            setOrderForms={setOrderForms} // Add this prop
            setOrderData={(updatedData) => handleUpdateOrderForm(index, updatedData)}
            handleRemoveOrderForm={() => handleRemoveOrderForm(index)}
            handleUpdateOrderForm={(updatedData) => handleUpdateOrderForm(index, updatedData)}
            setSerieData={setSerieData}
            index={index}
          />
        ))}
        <button
          type="button"
          onClick={handleAddOrderForm}
          className="btn"
        >
          Add Order Form
        </button>
      </div>

      <button type="submit" className='btn col-span-6'>Submit</button>
    </form>
  );
};

export default SeriesForm;