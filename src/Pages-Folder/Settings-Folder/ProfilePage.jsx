import React, { useState } from 'react';
import CustomCheckbox from '../../SharableComponents-Folder/CustomCheckbox';
import TimeInput from '../../SharableComponents-Folder/TimeInput';
import { useDispatch, useSelector } from 'react-redux';
import localforage from 'localforage';
import { setClient } from '../../Redux-Store/Features/Auth-Folder/authSlice';
import { loginUser } from '../../Redux-Store/Features/Auth-Folder/authActions';
import { toast } from 'react-toastify';
import Button from '../../SharableComponents-Folder/Button';

const ProfilePage = () => {
    const { user, client } = useSelector((state) => state.auth);
    console.log('----------------', user)

    const [organizationName, setOrganizationName] = useState(client.name);
    const [subsidy, setSubsidy] = useState(
        client.subsidy_type === "full"
            ? "fully_subsidised"
            : client.subsidy_type === "part"
                ? "partly_subsidised"
                : "fully_paid"
    );

    const [cutoffTime, setCutoffTime] = useState(() => {
        const [hour, minute] = client.order_start_time.split(":").map(Number);
        return { hour, minute };
    });

    const [secondCutoffTime, setSecondCutoffTime] = useState(() => {
        const [hour, minute] = client.order_end_time.split(":").map(Number);
        return { hour, minute };
    });

    const [subsidyType, setSubsidyType] = useState(
        client.subsidy_amount_type === "percentage" ? "Percentage" : "Fixed Amount"
    );

    const [subsidyValue, setSubsidyValue] = useState(client.subsidy_amount_value || "0.00");
    const [paymentMethod, setPaymentMethod] = useState(client.employee_cover || "cash");

    const [isSaving, setIsSaving] = useState(false);

    const dispatch = useDispatch();

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const dataToSave = {
            id: client.id,
            name: organizationName,
            code: client.code,
            subsidy_type: subsidy === "fully_subsidised" ? "full"
                : subsidy === "partly_subsidised" ? "part"
                    : "none",
            order_start_time: `${cutoffTime.hour.toString().padStart(2, '0')}:${cutoffTime.minute.toString().padStart(2, '0')}`,
            order_end_time: `${secondCutoffTime.hour.toString().padStart(2, '0')}:${secondCutoffTime.minute.toString().padStart(2, '0')}`,
            subsidy_amount_type: subsidyType === "Fixed Amount" ? "fixed" : "percentage",
            subsidy_amount_value: subsidyValue,
            employee_cover: paymentMethod
        };

        try {
            // Save to localforage
            await localforage.setItem('client', dataToSave);

            // Update Redux store
            dispatch(setClient(dataToSave));
            dispatch(loginUser());

            console.log("Updated client saved:", dataToSave);

            // Show success toast
            toast.success('Saved successfully!', {
            });
        } catch (err) {
            console.error("Error saving to localforage:", err);

            // show error toast
            toast.error('Error saving data.', {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className='w-full flex justify-center'>
            <form className="space-y-2 max-w-3xl" onSubmit={handleSave}>
                <div className="grid md:grid-cols-3 items-center gap-2">
                    <label className="font-medium text-gray-700 text-[13px]">Organisation's name:</label>
                    <input type="text" value={organizationName} onChange={e => setOrganizationName(e.target.value)}
                        className="md:col-span-2 border text-[13px] border-gray-300 rounded-lg p-3 w-full transition"
                    />
                </div>

                <div className="border-t border-gray-300 my-4"></div>

                <div className="grid  md:grid-cols-3 gap-2 pt-4">
                    <div className="font-medium text-gray-700 md:col-span-1 text-[13px]"
                    >Food delivered to employees are:
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <CustomCheckbox
                            label="Fully subsidised" checked={subsidy === "fully_subsidised"}
                            onChange={() => setSubsidy('fully_subsidised')} />

                        <CustomCheckbox
                            label="Partly subsidised" checked={subsidy === "partly_subsidised"}
                            onChange={() => setSubsidy('partly_subsidised')} />

                        <CustomCheckbox
                            label="Fully paid by employees" checked={subsidy === "fully_paid"}
                            onChange={() => setSubsidy('fully_paid')} />
                    </div>

                    {subsidy === "partly_subsidised" && (
                        <div className="w-[90vw] max-w-3xl space-y-8 mt-4">

                            {/* Subsidy Type */}
                            <div className="grid md:grid-cols-3 items-center gap-4">
                                <label className="text-[13px] font-medium text-gray-700">
                                    Is the subsidy a percentage or a fixed amount?
                                </label>

                                <select
                                    value={subsidyType}
                                    onChange={(e) => setSubsidyType(e.target.value)}
                                    className="md:col-span-2 w-full bg-white border border-gray-400 rounded-md py-3 px-3 text-[13px]"
                                >
                                    <option className='text-[13px]' value="Fixed Amount">Fixed Amount</option>
                                    <option className='text-[13px]' value="Percentage">Percentage</option>
                                </select>
                            </div>

                            <div className="border-t border-gray-300 my-4"></div>

                            {/* Subsidy Value */}
                            <div className="grid md:grid-cols-3 items-center gap-4">
                                <label className="text-[13px] font-medium text-gray-700">
                                    What is the subsidy amount or percentage?
                                </label>

                                <div className="md:col-span-2 flex">
                                    <div className="bg-gray-100 border border-gray-400 border-r-0 rounded-l-md flex items-center px-4">
                                        <span className="text-gray-700 font-semibold text-[13px]">
                                            {subsidyType === "Percentage" ? "%" : "GHS"}
                                        </span>
                                    </div>

                                    <input
                                        type="text"
                                        value={subsidyValue}
                                        onChange={(e) => setSubsidyValue(e.target.value)}
                                        className="w-full border border-gray-400 rounded-r-md py-2 px-3"
                                    />
                                </div>
                            </div>

                            {/* borderline */}
                            <div className="border-t border-gray-300 my-4"></div>

                            {/* Deduction Method */}
                            <div className="grid md:grid-cols-3 items-start gap-4">
                                <label className="text-[13px] font-medium text-gray-700">
                                    How are employees covering their portion?
                                </label>

                                <div className="md:col-span-2 space-y-3">
                                    <CustomCheckbox
                                        label="Deduction from payroll"
                                        checked={paymentMethod === "payroll"}
                                        onChange={() => setPaymentMethod("payroll")}
                                    />

                                    <CustomCheckbox
                                        label="Cash"
                                        checked={paymentMethod === "cash"}
                                        onChange={() => setPaymentMethod("cash")}
                                    />
                                </div>
                            </div>

                            <div className="border-t border-gray-300 my-4"></div>

                        </div>

                    )}

                    {subsidy === "fully_paid" && (
                        <div className="w-[90vw] max-w-3xl space-y-8 mt-4">
                            <div className='grid md:grid-cols-3 items-start gap-4'>
                                <label className="block text-[13px] font-medium text-gray-700 mb-2">
                                    How are employees covering their portion?
                                </label>

                                <div>
                                    <CustomCheckbox
                                        label="Deduction from payroll"
                                        checked={paymentMethod === "payroll"}
                                        onChange={() => setPaymentMethod("payroll")}
                                    />

                                    <CustomCheckbox
                                        label="Cash"
                                        checked={paymentMethod === "cash"}
                                        onChange={() => setPaymentMethod("cash")}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    <div className="font-medium text-gray-700 md:col-span-1 text-[13px]">Preferred cut-off time for orders:</div>
                    <div className="md:col-span-2 flex space-x-6">
                        <TimeInput value={cutoffTime} onChange={setCutoffTime} />
                        <TimeInput value={secondCutoffTime} onChange={setSecondCutoffTime} />
                    </div>
                </div>
                <div className="flex justify-end pt-12">
                    <Button type="submit" loading={isSaving} loadingText="Saving...">
                        Save Changes
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default ProfilePage;
