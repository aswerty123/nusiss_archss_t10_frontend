import React from 'react';

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

const Heading = tw.h1`text-blue-500 text-2xl p-2`;
// const Container = tw.div`max-w-4xl mx-auto p-5 mt-5`;

export const Landing = () => {
  const containerStyle = {
    backgroundColor: '#FFC0CB', // Set the background color to red
    // backgroundColor: '#FFFFFF', // Set the background color to red
    height: '90vh', // Set the height to 100% of the viewport height
    width: '100vw', // Set the width to 100% of the viewport width
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
  };
  return (
    <>
      <div data-testid="landing-container" style={containerStyle}>
        <Heading>This is LandingPage</Heading>
      </div>
    </>
  );
};
