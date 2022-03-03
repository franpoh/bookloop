import React from 'react'

const Title = ({ data }) => {
    // filter by index

    return (
        <>
            {data && data.map((item, key) => {
                return (
                    <div key={key}>
                        <div>
                            <p>{item.Index.title}</p>
                            <img alt="covers" style={{ width: 100, height: 150 }} src={item.Index.imageURL} />
                        </div>
                    </div>
                )
            })}
        </>

    )
}

export default Title;