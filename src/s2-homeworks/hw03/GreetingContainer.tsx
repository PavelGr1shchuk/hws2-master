import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import Greeting from './Greeting'
import { UserType } from './HW3'

type SetNameType = (name: string) => void

type GreetingContainerPropsType = {
    users: UserType[]
    addUserCallback: SetNameType
}

export const pureAddUser = (name: string, setError: (error: string) => void, setName: SetNameType, addUserCallback: SetNameType) => {
    // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
    if (!name) {
        setError('Name should not be empty');
    } else {
        addUserCallback(name);
        setName('');
    }
}

export const pureOnBlur = (name: string, setError: (error: string) => void) => { // если имя пустое - показать ошибку
    if (!name) {
        setError('Name should not be empty');
    }
}

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: () => void) => { // если нажата кнопка Enter - добавить
    if (e.key === 'Enter') {
        addUser();
    }
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
    users,
    addUserCallback,
}) => {
    // деструктуризация пропсов
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)

        error && setError('')
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length;
    const lastUserName = users.at(-1)?.name;

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
