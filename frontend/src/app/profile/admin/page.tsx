"use client"

import React from 'react'
import styled from 'styled-components'

export const CreateEvent = () => {
  return (
	<div>
		<CenteredContainer>
			<h1>New Event</h1>
			<p>Event Name:</p>
			<Input type='text' placeholder='Enter event name'></Input>
			<p>Date:</p>
			<Input type='date'></Input>
			<p>Venue:</p>
			<Input type='text' placeholder='Enter venue'></Input>
			<p>Description:</p>
			<Input type='text' placeholder='Enter description'></Input>
			<p>Organiser Address:</p>
			<Input type='text' placeholder='Enter organiser address'></Input>
		</CenteredContainer>
	</div>
  )
}

export default CreateEvent

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
`

const Input = styled.input`
	display: block;
	margin-bottom: 10px;
	padding: 8px;
	font-size: 16px;
	width: 100%;
	max-width: 400px;
	color: blue;
`
