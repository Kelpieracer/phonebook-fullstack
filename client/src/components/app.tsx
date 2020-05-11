/**
 * CRUD phonebook directory application "phonebook-front"
 * 
 * @author Tapio Mäntysalo
 * @license MIT
 */

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import { Person } from '../types/directory-types'
import nameExists, { telExists } from '../helpers/directory-helpers'
import PopUp from './popup'
import DirectoryTable from './directory-table'

const serverUri = window.location.href === 'http://localhost:3000/'
    ? 'http://localhost:3001/api/persons/' : '/api/persons/'
console.log(`Backend api: ${serverUri}`)

/**
 * CRUD phonebook directory application "phonebook-front"
 * This is the main application.
 * 
 * If name or telephone number already exists in the directory, informs the user and does not add the entry.
 * 
 * If name or telephone number is missing, does not add an entry.
 * 
 * Enter key or Add button adds the entry to the directory.
 * 
 * Cursor is moved to the first field (name) after Enter, for easy adding of next entry.
 * 
 * In case of a problem, cursor is moved to the input box with the problem.
 * 
 * Telephone number and name are not validated, just trimmed.
 * 
 * Each entry has a unique id.
 * 
 * Entries can be deleted with the trash can icon.
 * @author Tapio Mäntysalo
 * @license MIT
 */
const App = () => {
    type PopUpType = 'NONE' | 'NAME_EXISTS' | 'TEL__EXISTS'

    /**
     * States, by useState
     */
    console.log('useState')
    const [persons, setPersons] = useState<Person[]>([])
    const [showPopUp, setShowPopUp] = useState<PopUpType>('NONE')
    const [newPerson, setNewPerson] = useState<Person>()

    /**
     *  Fetch the telephone directory from database
     * This is connected to componentDidMount by useEffect()
     */

    /** Deletes a person from database, for good */
    const deletePerson = function (id: string) {
        console.log('deletePerson: ' + id)
        axios
            .delete(serverUri + id)
            .then(response => {
                console.log('deleted response from db: ' + response.statusText)
                setPersons(persons.filter(person => person._id !== id))     // Trustig that no one else is using the db
            })
            .catch(err => {
                alert('Backend ' + err)
                throw new Error(err)
            })
    }

    /**
     *  Fetch the telephone directory from database
     * This is connected to componentDidMount by useEffect()
     */
    const readPersons = function (textToSearch: string | undefined) {
        const searchText = (!textToSearch || textToSearch === '') ? '_' : textToSearch
        console.log(`readPersons: ${searchText} `)
        axios
            .get(`${serverUri}search/${searchText}`)
            .then(response => {
                console.log('read response from db: ' + response.statusText)
                setPersons(response.data)
            })
            .catch(err => {
                alert('Backend ' + err)
                throw new Error(err)
            })
    }
    console.log('useEffect')

    /**
     * CREATE a new entry to the telephone directory
     * @description 
     * If name or telephone number already exists in the directory, informs the user and does not add the entry
     * If name or telephone number is missing, does not add an entry
     * Enter key or Add button adds the entry to the directory
     * Cursor is moved to the first field (name) after Enter, for easy adding of next entry
     * In case of a problem, cursor is moved to the input box with the problem
     * Telephone number and name are not validated, just trimmed
     * Each entry has a unique id
     */
    const createPerson = () => {
        const nameElement = (document.getElementById('input-name') as HTMLInputElement)
        const telElement = (document.getElementById('input-tel') as HTMLInputElement)
        const name = nameElement.value.trim()
        const tel = telElement.value.trim()
        if (nameExists(name, persons)) {
            setNewPerson({ name: name, tel: tel })
            setShowPopUp('NAME_EXISTS')
            nameElement.focus()
            nameElement.value = ''
        }
        else if (telExists(tel, persons)) {
            setNewPerson({ name: name, tel: tel })
            setShowPopUp('TEL__EXISTS')
            telElement.focus()
            telElement.value = ''
        } else {
            if (!(name.length > 0)) {
                nameElement.focus()
            } else if (!(tel.length > 0)) {
                telElement.focus()
            }
            else {
                const newPersonItem: Person = { name: name, tel: tel }
                nameElement.value = ''
                telElement.value = ''
                axios
                    .post(serverUri, newPersonItem)
                    .then(response => {
                        console.log('created to database: ' + response.statusText)
                        searchPersons()       // Database will allocate the id => refresh all!
                        nameElement.focus()
                    })
                    .catch(err => {
                        alert('Backend ' + err)
                        throw new Error(err)
                    })
            }
            setShowPopUp('NONE')
        }
    }

    /**
     * Make enter key to "submit" also, in addition to "Add" button
     * @param event key event
     */
    const checkKey = (event: any) => {
        setShowPopUp('NONE')
        if (event.key === 'Enter') {
            createPerson()
        }
    }

    /**
     * Each keypress into search box will launch a search query
     * @param event key event
     */
    const searchPersons = () => {
        const searchElement = (document.getElementById('search-box') as HTMLInputElement)
        const searchText = searchElement.value.trim()
        readPersons(searchText)
        searchElement.focus()
    }
    useEffect(searchPersons, [])     // Empty array tells react that it is necessary to call this only once => componentDidMount effect.

    /**
     * These are predefined texts for the error popups
     */
    const nameExistsHtml = <div>Name <em>{newPerson?.name}</em> already exists in directory</div>
    const telExistsHtml = <div>Phone number <em>{newPerson?.tel}</em> already exists in directory</div>

    /**
     * render
     */
    console.log('render')
    return (
        <Container fluid="xl">
            <p></p>
            <PopUp title="Duplicate entry" main={showPopUp === 'NAME_EXISTS' ? nameExistsHtml : telExistsHtml}
                button="Ok" show={showPopUp !== 'NONE'} />
            <Row>
                <Col xl="auto">
                    <h2>Telephone Directory</h2>
                </Col>
            </Row>
            <Form.Group>
                <Row>
                    <Col xl="auto">
                        <Form.Label>New name</Form.Label>
                        <Form.Control size="sm" id="input-name" type="text" placeholder="Enter new name" onKeyDown={checkKey} />
                    </Col>
                </Row>
                <Row>
                    <Col xl="auto">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control size="sm" id="input-tel" type="tel" placeholder="Enter phone number" onKeyDown={checkKey} />
                    </Col>
                    <Col xl="auto">
                        <Button size="sm" onClick={createPerson}>Add</Button>
                        <p></p>
                        <p></p>
                        <Dropdown>
                            <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
                                Docs
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/client-doc">Client documentation</Dropdown.Item>
                                <Dropdown.Item href="/server-doc">Server documentation</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col xl="auto">
                        <Form.Label>Search</Form.Label>
                        <Form.Control id="search-box" type="text" placeholder="Start typing to limit search results" onKeyUp={searchPersons} />
                    </Col>
                </Row>
            </Form.Group>
            <Row>
                <Col xl="auto"> 
                    <p></p>
                </Col>
            </Row>
            <Row>
                <Col xl="auto">
                    <DirectoryTable persons={persons} deleteCallBack={deletePerson} />
                </Col>
            </Row>
        </Container>
    )
}

export default App