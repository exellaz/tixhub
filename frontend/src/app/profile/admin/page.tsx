"use client"

import React from 'react'
import EventForm from './EventForm'
import { EventData } from './types'

export const CreateEventPage = () => {

	const handleEventCreate = (eventData: EventData) => {
		console.log('Event Data:', eventData)
		console.log('Create new event...')
	}

	return (
		<div>
			<EventForm onSubmit={handleEventCreate} />
		</div>
	)
}

export default CreateEventPage
