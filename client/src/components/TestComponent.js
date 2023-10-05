import React from 'react';

export const TestComponent = () => {
  return (
    <>
      <div className="w-72 relative">
        <select
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="version"
        >
          <option>Material Tailwind HTML</option>
          <option>Material Tailwind React</option>
          <option>Material Tailwind Vue</option>
          <option>Material Tailwind Angular</option>
          <option>Material Tailwind Svelte</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7 10a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1zm-1-8a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3H9v6h1a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1V3H7a1 1 0 0 1-1-1z"
            />
          </svg>
        </div>
      </div>
      {''}
      {/* <div className="p-4">
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="w-full">
            <div className="relative">
              <input
                type="text"
                id="free-solo-with-text-demo"
                name="role"
                placeholder="Select Role"
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 10a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1zm-1-8a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3H9v6h1a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1V3H7a1 1 0 0 1-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="relative">
              <input
                type="text"
                id="skills"
                name="skills"
                placeholder="Write your skills"
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 10a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1zm-1-8a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3H9v6h1a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1V3H7a1 1 0 0 1-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2 space-x-2">
              <span className="text-xs text-gray-500">Suggestion:</span>
              <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs text-gray-700">
                Java
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs text-gray-700">
                HTML
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs text-gray-700">
                Bootstrap
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs text-gray-700">
                JavaScript
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs text-gray-700">
                NodeJS
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div> */}
      {''}
      {/* <div className="flex flex-wrap mx-2">
   <div className="bg-white shadow-md rounded-md p-6">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg font-semibold text-gray-800">About me</h5>
            </div>
            <hr className="border-t border-gray-300 my-4" />
            <div className="space-y-2">
                <p className="text-sm text-gray-600">
                    Hello, I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I
                    create digital Products a more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus
                    at.
                </p>
                <div className="text-sm font-semibold">Personal Details</div>
                <hr className="border-t border-gray-300 my-2" />
                <div className="space-y-2">
                    <div className="flex items-center">
                        <div className="font-semibold w-1/3">Full Name:</div>
                        <div>JWT User</div>
                    </div>
                    <div className="flex items-center">
                        <div className="font-semibold w-1/3">Fathers Name:</div>
                        <div>Mr. Deepen Handgun</div>
                    </div>
                    <div className="flex items-center">
                        <div className="font-semibold w-1/3">Address:</div>
                        <div>Street 110-B Kalians Bag, Dewan, M.P. INDIA</div>
                    </div>
                    <div className="flex items-center">
                        <div className="font-semibold w-1/3">Zip Code:</div>
                        <div>12345</div>
                    </div>
                    <div className="flex items-center">
                        <div className="font-semibold w-1/3">Phone:</div>
                        <div>+0 123456789 , +0 123456789</div>
                    </div>
                    <div className="flex items-center">
                        <div className="font-semibold w-1/3">Email:</div>
                        <div>support@example.com</div>
                    </div>
                    <div className="flex items-center">
                        <div className="font-semibold w-1/3">Website:</div>
                        <div>http://example.com</div>
                    </div>
                </div>
            </div>
        </div></div> */}{' '}
      {/* <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
            <div className="mb-4 flex items-center justify-between">
                <h5 className="text-lg font-semibold text-gray-800">On Submit</h5>
                <a
                    href="https://formik.org/docs/examples/with-material-ui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    Reference
                </a>
            </div>
            <hr className="border-t border-gray-300" />
            <form >
                <div className="grid grid-cols-1 gap-3 mt-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
                        >
                            Verify & Submit
                        </button>
                    </div>
                </div>
            </form>
        </div> */}{' '}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6 bg-white rounded-md shadow-md">
        <div className="col-span-full">
          <h5 className="text-lg font-semibold text-gray-800 mb-4">
            Edit Account Details
          </h5>
          <hr className="border-t border-gray-300" />
        </div>
        <div className="col-span-full sm:col-span-2 md:col-span-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            value="JWT User"
            readOnly
          />
          <p className="text-sm text-gray-600 mt-1">Helper text</p>
        </div>
        <div className="col-span-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email address
          </label>
          <input
            id="email"
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            value="name@example.com"
            readOnly
          />
        </div>
        <div className="col-span-full sm:col-span-1 md:col-span-1">
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-600"
          >
            Company
          </label>
          <input
            id="company"
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            value="Materially Inc."
            readOnly
          />
        </div>
        <div className="col-span-full sm:col-span-1 md:col-span-1">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-600"
          >
            Country
          </label>
          <input
            id="country"
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            value="USA"
            readOnly
          />
        </div>
        <div className="col-span-full sm:col-span-1 md:col-span-1">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-600"
          >
            Phone number
          </label>
          <input
            id="phoneNumber"
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            value="4578-420-410"
            readOnly
          />
        </div>
        <div className="col-span-full sm:col-span-1 md:col-span-1">
          <label
            htmlFor="birthday"
            className="block text-sm font-medium text-gray-600"
          >
            Birthday
          </label>
          <input
            id="birthday"
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            value="31/01/2001"
            readOnly
          />
        </div>
        <div className="col-span-full">
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full">
            Change Details
          </button>
        </div>
      </div> */}
    </>
  );
};
