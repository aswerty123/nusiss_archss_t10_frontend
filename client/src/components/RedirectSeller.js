import React from 'react'

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

const NotAllowedTag = tw.div`mx-40 mt-10 text-center bg-red-100 border-2 border-red-400 text-red-700 rounded p-1 my-auto text-sm`;

export const RedirectSeller = () => {
    const containerStyle = {
        backgroundColor: '#FFC0CB', // Set the background color to red
        height: '90vh', // Set the height to 100% of the viewport height
        width: '100vw', // Set the width to 100% of the viewport width
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };
  return (
    <div style={containerStyle}>
      <NotAllowedTag>
      Users with <strong>Seller</strong> Role are <strong>NOT Allowed</strong> in this route!
      </NotAllowedTag>
    </div>)
}
