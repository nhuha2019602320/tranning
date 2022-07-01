import { match } from 'assert'
import { info } from 'console'
import { link } from 'fs/promises'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

interface Student {
  msv: number, name: string, score: number
}

const studentsDefault: Student[] = [
  { msv: 123, name: 'nguyen van_A', score: 4 },
  { msv: 321, name: 'nguyen van_B', score: 5 },
  { msv: 456, name: 'nguyen van_C', score: 6 },
]

//update name, score, noupdate msv
const Home: NextPage = () => {
  const [job, setJob] = useState<string>('');
  const [jobs, setJobs] = useState<string[]>([]);
  const [indexUpdate, setIndexUpdate] = useState<number>();
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [students, setStudents] = useState<Student[]>(studentsDefault);
  const [checked, setChecked] = useState<number>();
  const handleSubmit = () => {
    setJobs((data) => [...data, job]);
    setJob('');
  }
  const handleUpdate = (index: number) => {
    setIndexUpdate(index);
    setIsUpdated(true);
    setJob(jobs[index]);
  }
  const handleSubmitUpdate = () => {
    // console.log(jobs)
    const data = jobs.map((item, index) => {
      if (index === indexUpdate) {
        item = job
      }
      console.log(index)
      console.log("item " + item)
      return item
    })
    setJobs(data);
    setIsUpdated(false);
    setJob('');
  }
  const handleDelete = (index: number) => {
    const data = jobs.filter((item, i) => i !== index)
    setJob(jobs[index] = '')
    setIsUpdated(false)
    setJobs(data)
  }

  const handleSubmitCheck = () => {
    const id = { msv: checked }
    console.log(id.msv);
    console.log(typeof job)
    if (parseInt(job) < 0 || parseInt(job) > 10)
      alert("score invalid")
    else {
      const data = students.map((student, i) => {
        if (student.msv === id.msv)
          student.score = parseInt(job);
        console.log(student)

        return student;
      })
      setStudents(data);
      setJob('')

    }
  }

  // const handleCheck = (msv: number) => {
  //     setChecked([msv])
  // }
  return (
    <div className="container">
      <h1>TODO APP</h1>
      <input value={job} onChange={(e) => setJob(e.target.value)} type="text" placeholder="Enter your todo" />&nbsp;
      {
        isUpdated ? (<button onClick={handleSubmitUpdate}>Update</button>)
          : (<button onClick={handleSubmit}>Add Todo</button>)
      }
      <div>
        <ul>
          {
            jobs.map((job, index) => {
              return (
                <li key={index}>
                  {job}&nbsp;&nbsp;&nbsp;
                  <button onClick={() => handleDelete(index)}>x</button>&nbsp;&nbsp;&nbsp;
                  <button onClick={() => handleUpdate(index)}>update</button>
                  <hr />
                </li>
              )
            })
          }
        </ul>
      </div>
      <div>
        <ul>
          {
            students.map((student) => {
              return (
                <li key={student.msv}>

                  {student.msv}&nbsp;
                  {student.name}&nbsp;
                  {student.score}&nbsp;
                  <input id="chekcValue"
                    type="checkBox"
                    checked={checked === student.msv}
                    onChange={() => {
                      setChecked(student.msv)
                      setJob(student.score.toString())
                    }} />
                </li>
              )
            })
          }
        </ul>
        <button onClick={handleSubmitCheck}>Change Score</button>
      </div>
    </div>
  )
}

export default Home
