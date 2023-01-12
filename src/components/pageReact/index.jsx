import React from "react";

const PageReact = () => {
    console.log(process.env)
    return (
        <div className='w-full text-center'>
            <div>这是 React 页面</div>
            <button className="mt-[10px] bg-[#3a7bff] p-[10px] text-[#fff] rounded-[5px] hover:bg-[#1c63c9] transform-gpu transition-all" onClick={() => window.location.href = 'index.html'}>to VuePage</button>
        </div>
    )
}

export default PageReact
