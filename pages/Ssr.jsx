import React from 'react';
import ConnectionDb from '../helper/ConnectionDb';
import UserSchema from '../models/UserSchema';

const Ssr = ({users}) => {
    console.log(users)
    return (
        <h3>
            {
                users.map(user=> (
                    <li key={user._id}>
                        {user.name}
                    </li>
                ))
            }
        </h3>
    );
};

export default Ssr;


// export const getStaticProps = async()=>{
//     try {
//         await ConnectionDb()
//         const users = await UserSchema.find();

//         return {
//             props: {
//                 users : JSON.parse(JSON.stringify(users))
//             }
//         }
//     }catch(error) {
//         console.log(error);

//     }
// }


export const getServerSideProps =async ()=>{
    try {
        await ConnectionDb();
        const userServer = await UserSchema.find();
        return {
            props:{
                users : JSON.parse(JSON.stringify(userServer))
            }
        }

    } catch(error) {
        console.log(error)
    }

}

