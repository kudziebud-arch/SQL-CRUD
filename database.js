import dotenv from "dotenv";
dotenv.config();

import msql from 'mysql2'

//creation of connection pool(having many db_conn)
const pool=msql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise();



export async function getNotes(){
    const [rows]=await pool.query("select * from notes");
    return rows;
}

//variable to store rows(i.e notes) from function we are calling
//console.log("All the records are as follows:");
//const notes=await getNotes();
//console.log(notes);

//get single record by its id(READ/SELECT)
//console.log("The single record is as follows:");
export async function getNote(id){
    const [rows]=await pool.query(
        'select * from notes where id = ?',
        [id]);

        return rows[0];   
}
        //function call and return one row with id=1
        //const note=await getNote(1);
        //console.log(note);

//create operation for mysql
//console.log("created record is as follows:");
export async function createNote(title,contents){
    const [result]=await pool.query(
        'insert into notes(title,contents) values(?,?)'
        ,[title,contents]);
        
        const id=result.insertId;
        return getNote(id);
    
}

//const result=await createNote('Test title','Test contents');
//console.log(result);


//update note logic
export async function updateNote(id, title, contents) {
  await pool.query(
    `
    UPDATE notes
    SET title = ?, contents = ?
    WHERE id = ?
    `,
    [title, contents, id]
  )

  return getNote(id)
}
/*
const updatedNote = await updateNote(
  1,
  'Updated Title',
  'Updated Contents'
)

console.log(updatedNote)
*/

 //delete note logic
  console.log("The below note has been deleted successfully");

 export async function deleteNote(id){
    const note =await getNote(id);

    await pool.query(
        "delete from notes where id=?",
        [id]
    );
    return note
 }

 /*const deletedNote=await deleteNote(1);
 console.log(deletedNote);
*/



