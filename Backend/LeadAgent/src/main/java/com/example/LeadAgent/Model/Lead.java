package com.example.LeadAgent.Model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "leads")
public class Lead {

	@Id
	private String id;
	private String firstName;
	private String lastName;
	private long mobile;
	private String email;
	private String assignedTo;
	private String status;
	private String notes;
	private Date createdAt;
	private Date updatedAt;

	// Constructor to initialize Lead object
	public Lead(String firstName, String lastName, long mobile, String email, String assignedTo, String status) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.mobile = mobile;
		this.email = email;
		this.assignedTo = assignedTo;
		this.status = status;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	// Getter and setter methods
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public long getMobile() {
		return mobile;
	}

	public void setMobile(long mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAssignedTo() {
		return assignedTo;
	}

	public void setAssignedTo(String assignedTo) {
		this.assignedTo = assignedTo;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

}
