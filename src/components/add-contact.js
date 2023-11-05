"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./modal";
import { useState } from "react";
import { addContact } from "@/api";
import { useRouter } from "next/navigation";
import { splitName } from "@/utils";

const AddContact = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState(null);
  const [photo, setPhoto] = useState("");

  const handleSubmitNewContact = async (e) => {
    e.preventDefault();
    const { firstName, lastName } = splitName(fullName);

    await addContact({
      firstName,
      lastName,
      age,
      photo,
    });
    setFullName("");
    setAge(null);
    setPhoto("");
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
          <h3 className="font-bold text-lg mb-3">Add New Contact</h3>
          <div className="flex flex-col gap-y-4">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Fullname"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              value={age}
              min="1"
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Photo URL"
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
