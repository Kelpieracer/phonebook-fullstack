import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FaTrash } from 'react-icons/fa';
import { Person } from '../types/directory-types'


/** Directory table element */
const DirectoryTable = ({ persons, deleteCallBack }:
    /** Props type */
    {
        /** The telephone-directory database */
        persons: Person[],
        /** Function that deletes a record in database. Parameter: record id
         */
        deleteCallBack: (id: string) => void
    }) => {
    console.log(persons.map(person => person._id + ":" + person.name).join(' , '))
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [personToDelete, setPersonToDelete] = useState<Person>()
    const [personTextToDelete, setPersonTextToDelete] = useState('')

    /**
     * Delete confirmation popup closing
     */
    const handleClose = () => setShowDeletePopup(false);

    /**
     * Handles delete mouse-click, invokes a confirmation popup
     * @param event mouse event on delete button
     */
    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (event.currentTarget) {
            const id = event.currentTarget.id
            const person = persons.find(person => person._id === id)
            setPersonToDelete(person)
            setPersonTextToDelete(person ? `${person.name} / ${person.tel}` : '')
            setShowDeletePopup(true)
        }
    }

    /**
     * Callback link to confirmation popup of one person from database - this actually calls the delete person
     */
    const deletePerson = () => {
        if (personToDelete && personToDelete._id) {
            deleteCallBack(personToDelete._id)
        }
        handleClose()
    }

    return (
        <>
            <Modal show={showDeletePopup} onHide={handleClose} animation={false}>
                <Modal.Body>Delete<em> {personTextToDelete} </em> ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deletePerson}>Delete</Button>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            <Table striped hover bordered responsive="sm" size="sm" >
                <thead>
                    <tr>
                        <th>Name</th>
                        <td>Number</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {persons.map(person =>
                        <tr key={person._id}>
                            <th>
                                {person.name}
                            </th>
                            <td>
                                {person.tel}
                            </td>
                            <td>
                                {<Button size="sm" variant="light" id={person._id} onClick={handleDeleteClick}><FaTrash /></Button>}
                            </td>
                        </tr>)}
                </tbody>
            </Table>
        </>
    )
}

export default DirectoryTable