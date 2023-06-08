import React, { useState } from "react";
import User from "../components/User";
import { RadioGroup } from "@headlessui/react";
import { Link } from "react-router-dom";

const accounts = [
  {
    id: "374ed1e4-481b-4074-a26e-6137657c6e35",
    fullName: "Bilal Gümüş",
    picture: "374ed1e4-481b-4074-a26e-6137657c6e35/1.jpg",
  },
  {
    id: "43332f46-89a4-435c-880e-4d72bb51149a",
    fullName: "Andrew Clark",
    picture: "43332f46-89a4-435c-880e-4d72bb51149a/1.jpg",
  },
  {
    id: "b8476d8d-bd7e-405f-aa66-9a22a9727930",
    fullName: "Amelia Miller",
    picture: "/b8476d8d-bd7e-405f-aa66-9a22a9727930/1.jpg",
  },
  {
    id: "88421e2c-ca7a-4332-815f-6e12824e2d05",
    fullName: "Sophia Smith",
    picture: "/88421e2c-ca7a-4332-815f-6e12824e2d05/1.jpg",
  },
  {
    id: "0c2f5599-9296-4f94-97d5-e773043188ae",
    fullName: "Emily Martinez",
    picture: "/0c2f5599-9296-4f94-97d5-e773043188ae/1.jpg",
  },
];

function UserSelect() {
  const [selected, setSelected] = useState(accounts[0]);
  const [customUser, setCustomUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-[24px] w-full max-w-[720px] mx-auto">
      <h1 className="text-2xl font-semibold">Select a Dummy User to Log In</h1>
      <div className="w-full p-4 text-right">
        <div className="mx-auto w-full max-w-md">
          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="space-y-2">
              {accounts.map((account) => (
                <User key={account.id} user={account} />
              ))}
              {customUser && (
                <div className="relative">
                  <User key={customUser.id} user={customUser} type="CUSTOM" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="text-indigo-800 w-6 h-6 absolute top-1/2 -translate-y-1/2 right-[-32px] cursor-pointer"
                    onClick={() => {
                      setCustomUser(null);
                      selected?.type === "CUSTOM" && setSelected(accounts[0]);
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}
            </div>
          </RadioGroup>
          {!customUser && (
            <div className="flex flex-col items-center justify-center w-full mt-3">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:border-indigo-200 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center py-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-indigo-500 mb-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                  <p className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">
                    Click to upload referral image
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG or JPEG
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  className="hidden"
                  onChange={async (e) => {
                    const files = e.target.files;
                    if (files == null || files.length == 0) {
                      setErrorMessage("No files wait for import.");
                      return;
                    }
                    let file = files[0];
                    let name = file.name;
                    let suffixArr = name.split("."),
                      suffix = suffixArr[suffixArr.length - 1];
                    if (
                      suffix != "png" &&
                      suffix != "jpg" &&
                      suffix != "jpeg"
                    ) {
                      setErrorMessage("Only support png jpg or jpeg files.");
                      return;
                    }

                    const base64 = await convertBase64(file);

                    const user = {
                      id: "custom",
                      fullName: name,
                      type: "CUSTOM",
                      picture: base64,
                    };

                    setCustomUser(user);
                    setSelected(user);
                  }}
                />
              </label>
              {errorMessage && (
                <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
              )}
            </div>
          )}
          <Link
            to="/login"
            state={{ account: selected }}
            className="mt-4 inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600"
          >
            Continue
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-1.5 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserSelect;
