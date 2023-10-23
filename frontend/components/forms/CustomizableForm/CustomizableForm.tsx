'use client'

// import React, { useState } from 'react';

// interface FormField {
//     id: number;
//     type: string;
//     label: string;
// }

// export default function CustomizableForm() {
//     const [showModal, setShowModal] = useState(false);
//     const [formFields, setFormFields] = useState<FormField[]>([]);

//     const openModal = () => {
//         setShowModal(true);
//     };

//     const closeModal = () => {
//         setShowModal(false);
//     };

//     const addField = (type: string) => {
//         const newField: FormField = {
//             id: formFields.length + 1,
//             type,
//             label: `Field ${formFields.length + 1}`,
//         };
//         setFormFields([...formFields, newField]);
//     };

//     return (
//         <div>
//             <button onClick={openModal}>Create New Form</button>

//             {showModal && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <span className="close" onClick={closeModal}>
//                             &times;
//                         </span>
//                         <h2>Form Builder</h2>
//                         <ul>
//                             <li onClick={() => addField('text')}>Text Input</li>
//                             <li onClick={() => addField('textarea')}>Text Area</li>
//                             <li onClick={() => addField('radio')}>Radio Buttons</li>
//                             <li onClick={() => addField('select')}>Select Input</li>
//                             <li onClick={() => addField('date')}>Date Input</li>
//                             <li onClick={() => addField('rating')}>Ratings</li>
//                         </ul>
//                     </div>
//                 </div>
//             )}

//             <div>
//                 <h3>Form Preview</h3>
//                 <form>
//                     {formFields.map((field) => (
//                         <div key={field.id}>
//                             <label>{field.label}</label>
//                             {field.type === 'text' && <input type="text" />}
//                             {field.type === 'textarea' && <textarea />}
//                             {field.type === 'radio' && <input type="radio" />}
//                             {field.type === 'select' && <select></select>}
//                             {field.type === 'date' && <input type="date" />}
//                             {field.type === 'rating' && <input type="range" min="1" max="5" />}
//                         </div>
//                     ))}
//                 </form>
//             </div>
//         </div>
//     );
// };
import React, { useState } from 'react';

const FieldForm = () => {
  const [fields, setFields] = useState<any>([]);

  const addField = () => {
    const newField = {
      id: new Date().getTime(),
    };
    setFields([...fields, newField]);
  };

  const removeField = (id:number) => {
    setFields(fields.filter((field:any) => field.id !== id));
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addField}
        >
          Add New Field
        </button>
      </div>

      <div>
        {fields.map((field:any) => (
          <div key={field.id} className="bg-gray-200 p-4 mb-4 rounded">
            <input
              type="text"
              className="border rounded w-64 py-2 px-4 mb-2"
              placeholder="Text Input"
            />
            <select
              className="border rounded w-64 py-2 px-4 mb-2"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              {/* Add more options as needed */}
            </select>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => removeField(field.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldForm;