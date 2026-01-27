import React from 'react'

function Header() {
  return (
    <div className='w-[100%] top-0'>
        <div className=" py-3 w-full">
                <nav className="flex items-center">
                <span className='relative  text-2xl font-bold'>
                    Cor                    
                    <span className="font-normal text-green-600">
                      Texte
                    </span>
                  </span>
                  
                  <div className="flex justify-end mx-[10px]">               
                      <span className=''>Mode nuit</span>
                  </div>
                </nav>
        </div>
    </div>
  );
};

export default Header