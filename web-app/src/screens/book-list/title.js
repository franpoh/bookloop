import React from 'react'

const Title = ({ data }) => {

    return (
        <>
            {data && data.map((item) => {
                return (
                    <div key={item.swapId}>
                        <div>
                            <p>{item.Index.title}</p>
                        </div>
                    </div>
                )
            })}
        </>

    )
}

export default Title;