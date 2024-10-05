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

        try {
            const response = await fetch('http://localhost:3001/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);
			createEvent(result)
        } catch (error) {
			console.error('Error:', error);
        }
    }

    return (
        <div>
            <EventForm onSubmit={handleEventCreate} />
        </div>
    )
}

export default CreateEventPage
