import React from 'react';
import { Check } from 'lucide-react';

const CustomCheckbox = ({ label, checked, onChange }) => (
  <label className="flex items-center space-x-3 cursor-pointer text-gray-700">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="hidden"
    />
    <div className={`w-4 h-4 flex items-center justify-center  transition ${
      checked ? 'bg-black' : 'bg-white border-2 border-gray-300 '
    }`}>
      {checked && <Check className="w-4 h-4 text-white" />}
    </div>
    <span className="text-sm font-medium">{label}</span>
  </label>
);

export default CustomCheckbox;
