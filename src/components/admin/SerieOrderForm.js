import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { FaArrowDown, FaCheck } from 'react-icons/fa';

const orderTypes = [
    { id: 1, name: 'Release' },
    { id: 2, name: 'Chronological' },
    { id: 3, name: 'Community' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SerieOrderForm = ({ serieData, orderForms, setOrderForms, setOrderData, handleRemoveOrderForm, handleUpdateOrderForm, setSerieData, index }) => {
    const [selected, setSelected] = useState(orderTypes.find((type) => type.name === orderForms[index].order_type));

    const handleChangeOrderType = (event) => {
        const selectedOrderType = event.name;

        // Update the order form data
        setOrderForms((prevForms) => {
            const updatedForms = prevForms.map((form, idx) => {
                if (idx === index) {
                    return {
                        ...form,
                        order_type: selectedOrderType,
                    };
                }
                return form;
            });
            return updatedForms;
        });

        // Update the serieData state with the selected order type
        setSerieData((prevData) => ({
            ...prevData,
            seriesOrder: prevData.seriesOrder.map((form, idx) => {
                if (idx === index) {
                    return {
                        ...form,
                        order_type: selectedOrderType,
                    };
                }
                return form;
            }),
        }));

        // Update the selected state immediately
        setSelected(selectedOrderType);
    };

    return (
        <div className="mb-4">
            <Listbox value={selected} onChange={(event) => handleChangeOrderType(event)}>
                {({ open }) => (
                    <>
                        <Listbox.Label className="block text-sm font-medium leading-6">Order Type</Listbox.Label>
                        <div className="relative mt-2">
                            <Listbox.Button className="relative w-full cursor-default rounded-md py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-btn sm:text-sm sm:leading-6">
                                <span className="flex items-center">
                                    <span className="ml-3 block truncate">{selected.name}</span>
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <FaArrowDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {orderTypes.map((type) => (
                                        <Listbox.Option
                                            key={type.id}
                                            className={({ active }) =>
                                                classNames(
                                                    active ? 'bg-btn' : '',
                                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                                )
                                            }
                                            value={type}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <div className="flex items-center">
                                                        <span
                                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                        >
                                                            {type.name}
                                                        </span>
                                                    </div>

                                                    {selected ? (
                                                        <span
                                                            className={classNames(
                                                                active ? '' : 'text-btn',
                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                            )}
                                                        >
                                                            <FaCheck className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
            {/* Other input fields */}
            <button
                type="button"
                onClick={handleRemoveOrderForm}
                className="text-red-500 hover:text-red-700"
            >
                Remove
            </button>
        </div>
    );
};

export default SerieOrderForm;

