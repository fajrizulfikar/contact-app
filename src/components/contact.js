"use client";

import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { editContact, deleteContact } from "@/api";

const Contact = ({ contact }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDeleted, setOpenModalDeleted] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(contact?.text);

  const handleSubmitEditContact = async (e) => {
    e.preventDefault();
    await editContact({
      id: contact.id,
      text: contactToEdit,
    });

    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteContact = async (id) => {
    await deleteContact(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <tr key={contact?.id}>
      <td className="w-full">
        <span> {contact?.text}</span>
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
            <div className="modal-action">
              <input
                type="text"
                value={contactToEdit}
                onChange={(e) => setContactToEdit(e.target.value)}
                placeholder="Type here"
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
              onClick={() => handleDeleteContact(contact.id)}
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
