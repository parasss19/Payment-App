import { useContext, useState } from 'react'
import { Button } from "./ui/button";
import toast from 'react-hot-toast';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "./ui/dialog";
import { MyContext } from '@/context/MyContext';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';


const UpdateInfo = ({ showUpdateInfo, setShowUpdateInfo }) => {
  
  const { setUserData, backendURL } = useContext(MyContext);

  const [newFirstName, setNewFirstName] = useState("");
  const [newusername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
 

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        `${backendURL}/api/v1/user/updateInfo`,
        {
          newFirstName,
          newusername,
          newPassword,
        },
        { withCredentials: true }
      );

      toast.success(response.data.message);

      // Update userData in context so UI reflects immediately
      if (response.data.user) {
        setUserData(response.data.user);
      }

      // Reset fields
      setNewFirstName("");
      setNewUsername("");
      setNewPassword("");
      setShowUpdateInfo(false);
    } 
    catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={showUpdateInfo} onOpenChange={setShowUpdateInfo}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-[poppins] text-xl font-semibold">
            Update Info
          </DialogTitle>
          <DialogDescription>
            Make changes to your personal details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* first name */}
          <input
            type="text"
            value={newFirstName}
            placeholder="FirstName"
            className="w-full border p-2 rounded"
            onChange={(e) => setNewFirstName(e.target.value)}
          />

          {/* email */}
          <input
            type="email"
            value={newusername}
            placeholder="Email"
            className="w-full border p-2 rounded"
            onChange={(e) => setNewUsername(e.target.value)}
          />

          {/* password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border p-2 rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Update Button */}
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={async () => {
            await handleSubmit();
            // Reset all fields
            setNewFirstName("");
            setNewUsername("");
            setNewPassword("");
            setShowUpdateInfo(false);
          }}
        >
          Update
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateInfo;
