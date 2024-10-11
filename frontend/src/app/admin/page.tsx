"use client"

import React from 'react'
import EventForm from './EventForm'
import { EventData } from './types'
import { createEvent } from '@/component/contractExecution'
import { setMaxIdleHTTPParsers } from 'http'
import { resolve } from 'path'

export const CreateEventPage = () => {

	const handleEventCreate = async (eventData: EventData) => {
		console.log('Event Data:', eventData)
        console.log('Create new event...')
		
		createEvent(eventData);
    }

    return (
        <div>
            <EventForm onSubmit={handleEventCreate} />
        </div>
    )
}

export default CreateEventPage