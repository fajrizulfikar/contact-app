"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./modal";
import { useState } from "react";
import { addContact } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddContact = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [newContactValue, setNewContactValue] = useState("");

  const handleSubmitNewContact = async (e) => {
    e.preventDefault();
    await addContact({
      id: uuidv4(),
      text: newContactValue,
    });
    setNewContactValue("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add New Contact
        <div className="ml-2">
          <AiOutlinePlus size={18} />
        </div>
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewContact}>
          <h3 className="font-bold text-lg">Add New Contact</h3>

          <div className="modal-action">
            <input
              type="text"
              value={newContactValue}
              onChange={(e) => setNewContactValue(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full"
            />

            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddContact;
