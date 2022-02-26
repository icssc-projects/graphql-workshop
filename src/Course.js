import { useEffect, useState } from "react";

function Course({id}) {
    const [course, setCourse] = useState()

    useEffect(async () => {
        const url = "https://api.peterportal.org/graphql";

        // The query is written as a string -- We'll JSONify it later
        const query = `
            query {
                course(id: "${id}"){
                    id
                    title
                    department
                    description
                    school
                    instructor_history {
                        shortened_name
                        email
                    }
                }
            }
            `;

        const options = {
            // This contains our query. We send it in the body of the request.
            body: JSON.stringify({ query }),

            // Because our request contains information in the body, we must send it as a POST request
            // All clients consuming a GraphQL API must use POST!!
            method: "POST",

            // Not necessary for every Web API, but it's good practice (and required for PeterPortal API)
            headers: { "Content-Type": "application/json" }
        }

        // Now we send our request! 
        const response = await fetch(url, options);
        const data = await response.json();
        const course = data["data"]["course"]
        console.log(course);
        setCourse(course)
    }, [])

    if (course === undefined) {
        return <>Loading...</>
    }

    return (
        <div>
            <h3>{course.id}: {course.title}</h3>
            <p>{course.description}</p>
            <h4>Previous Instructors</h4>
            <ul>
                {course.instructor_history.map(instructor => {
                    return <li key={instructor.email}>{instructor.shortened_name} ({instructor.email})</li>  
                })}
            </ul>
        </div>
    );
}

export default Course;