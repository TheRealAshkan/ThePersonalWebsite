export const getAllData = async () => {
    try {
        const res = await fetch(
            `http://localhost:3210/landing`,
            {
                method: 'GET',
                next: { revalidate: 1 }
            }
        );
        const data = await res.json();
        return data
    } catch (err) {
        console.log(err);
    }
};

// export const getImage = async () => {
//     try {
//         const res = await fetch(
//             `http://localhost:3210/upload`,
//             {
//                 method: 'GET',
//                 next: { revalidate: 1 }
//             }
//         );
//         const data = await res.json();
//         return data
//     } catch (err) {
//         console.log(err);
//     }
// };