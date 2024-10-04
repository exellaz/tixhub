"use client"

import React from 'react'
import EventForm from './EventForm'

export const CreateEventPage = () => {
	
	const handleEventCreate = (eventData) => {
		console.log('Event Data:', eventData)
	}

	return (
		<div>
			<EventForm onSubmit={handleEventCreate} />
		</div>
	)
}

export default CreateEventPage
