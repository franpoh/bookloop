import React from 'react'

const Title = ({ data }) => {

    return (
        <>
            {data && data.map((item) => {
                return (
                    <div key={item.Index.swapId}>
                        <div>
                            <p>{item.Index.title}</p>
                            <img style={{ width: 100, height: 150 }} src={item.Index.imageURL} />
                        </div>
                    </div>
                )
            })}
        </>

    )
}

export default Title;