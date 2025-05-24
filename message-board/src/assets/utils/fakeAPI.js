


function fetchMessages() {
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve([
                {
                    id: 1,
                    name: "Hane",
                    message: "test message",
                    created_at: "2025-05-23 10:00"
                },
                {
                    id: 2,
                    name: "Bob",
                    message: "test message2",
                    created_at: "2025-05-23 10:02"
                },
                {
                    id: 3,
                    name: "Bob",
                    message: "test message3",
                    created_at: "2025-05-23 10:05"
                }
            ])
        }, 500)
    })

}



export default fetchMessages;