"use client";

import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import Modal from "./modal";
import { useRouter } from "next/navigation";
import { editContact, deleteContact } from "@/api";
import { getFullName } from "@/utils";

const Contact = ({ contact }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDeleted, setOpenModalDeleted] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(contact);

  const handleSubmitEditContact = async (e) => {
    e.preventDefault();
    await editContact(contact);

    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteContact = async (id) => {
    await deleteContact(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  const fullName = getFullName(contact.firstName, contact.lastName);

  return (
    <tr key={contact?.id}>
      <td className="w-full">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              {/* had to use native img because next.js didn't allow cross-origin src in image */}
              <img
                src={contact.photo}
                alt="Avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
          <span>{fullName}</span>
        </div>
      </td>
      <td className="flex gap-5">
        <span
          onClick={() => setOpenModalEdit(true)}
          style={{ cursor: "pointer" }}
        >
          <FiEdit color="blue" size={25} />
        </span>
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditContact}>
            <h3 className="font-bold text-lg">Edit Contact</h3>
            <div className="flex flex-col gap-y-4">
              <input
                type="text"
                value={getFullName(
                  contactToEdit.firstName,
                  contactToEdit.lastName
                )}
                onChange={(e) =>
                  setContactToEdit((previousValue) => ({
                    ...previousValue,
                    fullName: e.target.value,
                  }))
                }
                placeholder="Fullname"
                className="input input-bordered w-full"
              />
              <input
                type="number"
                value={contactToEdit.age}
                min="1"
                onChange={(e) =>
                  setContactToEdit((previousValue) => ({
                    ...previousValue,
                    age: e.target.value,
                  }))
                }
                placeholder="Age"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                value={contactToEdit.photo}
                onChange={(e) =>
                  setContactToEdit((previousValue) => ({
                    ...previousValue,
                    photo: e.target.value,
                  }))
                }
                placeholder="Photo URL"
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <span
          onClick={() => setOpenModalDeleted(true)}
          style={{ cursor: "pointer" }}
        >
          <FaRegTrashAlt color="red" size={25} />
        </span>
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className="text-lg">
            Are you sure, you want to delete this contact?
          </h3>
          <div className="modal-action">
            <button
              onClick={() => handleDeleteContact(contact?.id)}
              className="btn"
            >
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Contact;
