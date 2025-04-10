import React, { useContext, useState } from 'react'
import { Button } from "./ui/button";
import { toast } from "react-toastify";

// Dialog components
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "./ui/dialog";
import { MyContext } from '@/context/MyContext';
import { Eye, EyeOff } from 'lucide-react';


const UpdateInfo = ({ showupdateinfo, setshowupdateinfo }) => {
  const [newFirstName, setNewFirstName] = useState("");
  const [newusername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); //for hide and show password

  const { setfirstName } = useContext(MyContext);
  
  const handleSubmit = async () => {
    
  }

  return (
    <>
      <Dialog open={showupdateinfo} onOpenChange={setshowupdateinfo}>
        <DialogContent>
            {/* Header */}
            <DialogHeader>
               <DialogTitle className="font-[poppins] text-xl font-semibold">Update Info</DialogTitle>
               <DialogDescription> Make changes to your personal details.</DialogDescription>
            </DialogHeader>

            {/* JSX body */}
            <div className="space-y-4 py-4">
                {/* first name */}
                <input 
                  type='text'
                  value={newFirstName}
                  placeholder='FirstName'
                  className='w-full border p-2 rounded'
                  onChange={(e) => setNewFirstName(e.target.value)}
                />

                {/* email */}
                <input 
                  type='email'
                  value={newusername}
                  placeholder='Email'
                  className='w-full border p-2 rounded'
                  onChange={(e) => setNewUsername(e.target.value)}
                />

                {/* password */}
                <div className='relative'>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder='Password'
                      className='w-full border p-2 rounded'
                      value={newPassword}
                      onChange={() => setNewPassword(e.target.value)}
                    />

                    <button
                      onClick={() => setShowPassword(!showPassword)} 
                      className='absolute right-2 top-1/2 transform -translate-y-1/2'
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            {/* Update Button */}
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={async () => {
                await handleSubmit(),    //our handleSubmit is async func so we have to await when calling
                // Reset all fields
                setNewFirstName("");
                setNewUsername("");
                setNewPassword("");
                setshowupdateinfo(false); //to close the dialog/modal when click on update btn
              }}
            >
                Update
            </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateInfo