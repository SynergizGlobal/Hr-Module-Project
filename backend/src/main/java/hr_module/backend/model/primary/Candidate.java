package hr_module.backend.model.primary;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;

@Setter
@Getter
@Entity
@Table (name = "candidate_details")
public class Candidate {
    public int getId() {
		return id;
	}

	public void setId(int id) {
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

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public float getTotalWorkExperience() {
		return totalWorkExperience;
	}

	public void setTotalWorkExperience(float totalWorkExperience) {
		this.totalWorkExperience = totalWorkExperience;
	}

	public Qualification getGraduationQualification() {
		return graduationQualification;
	}

	public void setGraduationQualification(Qualification graduationQualification) {
		this.graduationQualification = graduationQualification;
	}

	public Qualification getPostGraduationQualification() {
		return postGraduationQualification;
	}

	public void setPostGraduationQualification(Qualification postGraduationQualification) {
		this.postGraduationQualification = postGraduationQualification;
	}

	public Discipline getGraduationDiscipline() {
		return graduationDiscipline;
	}

	public void setGraduationDiscipline(Discipline graduationDiscipline) {
		this.graduationDiscipline = graduationDiscipline;
	}

	public Discipline getPostGraduationDiscipline() {
		return postGraduationDiscipline;
	}

	public void setPostGraduationDiscipline(Discipline postGraduationDiscipline) {
		this.postGraduationDiscipline = postGraduationDiscipline;
	}

	public Integer getGraduationYearOfPassing() {
		return graduationYearOfPassing;
	}

	public void setGraduationYearOfPassing(Integer graduationYearOfPassing) {
		this.graduationYearOfPassing = graduationYearOfPassing;
	}

	public Integer getPostGraduationYearOfPassing() {
		return postGraduationYearOfPassing;
	}

	public void setPostGraduationYearOfPassing(Integer postGraduationYearOfPassing) {
		this.postGraduationYearOfPassing = postGraduationYearOfPassing;
	}

	public ModeOfEducation getGraduationModeOfEducation() {
		return graduationModeOfEducation;
	}

	public void setGraduationModeOfEducation(ModeOfEducation graduationModeOfEducation) {
		this.graduationModeOfEducation = graduationModeOfEducation;
	}

	public ModeOfEducation getPostGraduationModeOfEducation() {
		return postGraduationModeOfEducation;
	}

	public void setPostGraduationModeOfEducation(ModeOfEducation postGraduationModeOfEducation) {
		this.postGraduationModeOfEducation = postGraduationModeOfEducation;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public float getCurrentCTC() {
		return currentCTC;
	}

	public void setCurrentCTC(float currentCTC) {
		this.currentCTC = currentCTC;
	}

	public float getExpectedCTC() {
		return expectedCTC;
	}

	public void setExpectedCTC(float expectedCTC) {
		this.expectedCTC = expectedCTC;
	}

	public String getResumeFilename() {
		return resumeFilename;
	}

	public void setResumeFilename(String resumeFilename) {
		this.resumeFilename = resumeFilename;
	}

	public CandidateStatus getCandidateStatus() {
		return candidateStatus;
	}

	public void setCandidateStatus(CandidateStatus candidateStatus) {
		this.candidateStatus = candidateStatus;
	}

	public Date getCandidateUploadDate() {
		return candidateUploadDate;
	}

	public void setCandidateUploadDate(Date candidateUploadDate) {
		this.candidateUploadDate = candidateUploadDate;
	}

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public CandidateStatus getTechnicalScreeningStatus() {
		return technicalScreeningStatus;
	}

	public void setTechnicalScreeningStatus(CandidateStatus technicalScreeningStatus) {
		this.technicalScreeningStatus = technicalScreeningStatus;
	}

	public String getTechnicalScreeningRemarks() {
		return technicalScreeningRemarks;
	}

	public void setTechnicalScreeningRemarks(String technicalScreeningRemarks) {
		this.technicalScreeningRemarks = technicalScreeningRemarks;
	}

	public String getTechnicalInterviewRemarks() {
		return technicalInterviewRemarks;
	}

	public void setTechnicalInterviewRemarks(String technicalInterviewRemarks) {
		this.technicalInterviewRemarks = technicalInterviewRemarks;
	}

	public Time getScreeningTime() {
		return screeningTime;
	}

	public void setScreeningTime(Time screeningTime) {
		this.screeningTime = screeningTime;
	}

	public String getCtcNegotiationRemarks() {
		return ctcNegotiationRemarks;
	}

	public void setCtcNegotiationRemarks(String ctcNegotiationRemarks) {
		this.ctcNegotiationRemarks = ctcNegotiationRemarks;
	}

	public float getCtcFinal() {
		return ctcFinal;
	}

	public void setCtcFinal(float ctcFinal) {
		this.ctcFinal = ctcFinal;
	}

	public CandidateStatus getCtcApprovalStatus() {
		return ctcApprovalStatus;
	}

	public void setCtcApprovalStatus(CandidateStatus ctcApprovalStatus) {
		this.ctcApprovalStatus = ctcApprovalStatus;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Date getCtcUpdateDate() {
		return ctcUpdateDate;
	}

	public void setCtcUpdateDate(Date ctcUpdateDate) {
		this.ctcUpdateDate = ctcUpdateDate;
	}

	public CandidateStatus getClientInterviewStatus() {
		return clientInterviewStatus;
	}

	public void setClientInterviewStatus(CandidateStatus clientInterviewStatus) {
		this.clientInterviewStatus = clientInterviewStatus;
	}

	public String getClientInterviewRemarks() {
		return clientInterviewRemarks;
	}

	public void setClientInterviewRemarks(String clientInterviewRemarks) {
		this.clientInterviewRemarks = clientInterviewRemarks;
	}

	public CandidateStatus getCvFormattingStatus() {
		return cvFormattingStatus;
	}

	public void setCvFormattingStatus(CandidateStatus cvFormattingStatus) {
		this.cvFormattingStatus = cvFormattingStatus;
	}

	public Date getCvSubmissionDate() {
		return cvSubmissionDate;
	}

	public void setCvSubmissionDate(Date cvSubmissionDate) {
		this.cvSubmissionDate = cvSubmissionDate;
	}

	public Time getCvSubmissionTime() {
		return cvSubmissionTime;
	}

	public void setCvSubmissionTime(Time cvSubmissionTime) {
		this.cvSubmissionTime = cvSubmissionTime;
	}

	public String getCvFormattingRemarks() {
		return cvFormattingRemarks;
	}

	public void setCvFormattingRemarks(String cvFormattingRemarks) {
		this.cvFormattingRemarks = cvFormattingRemarks;
	}

	public String getSkills() {
		return skills;
	}

	public void setSkills(String skills) {
		this.skills = skills;
	}

	@Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "candidate_id")
    private int id;

    @Column (name = "first_name", length = 50, nullable = false)
    private String firstName;

    @Column (name = "last_name", length = 50)
    private String lastName;

    @ManyToOne
    @JoinColumn (name = "pref_location_id_fk", referencedColumnName = "location_id")
    private Location location;

    @Column (name = "total_work_experience")
    private float totalWorkExperience;

    @ManyToOne
    @JoinColumn (name = "graduation_qualification_id_fk", referencedColumnName = "qualification_id")
    private Qualification graduationQualification;

    @ManyToOne
    @JoinColumn (name = "post_graduation_qualification_id_fk", referencedColumnName = "qualification_id")
    private Qualification postGraduationQualification;

    @ManyToOne
    @JoinColumn (name = "graduation_discipline_id_fk", referencedColumnName = "discipline_id")
    private Discipline graduationDiscipline;

    @ManyToOne
    @JoinColumn (name = "post_graduation_discipline_id_fk", referencedColumnName = "discipline_id")
    private Discipline postGraduationDiscipline;

    @Column (name = "graduation_year_of_passing")
    private Integer graduationYearOfPassing;

    @Column (name = "post_graduation_year_of_passing")
    private Integer postGraduationYearOfPassing;

    @ManyToOne
    @JoinColumn (name = "graduation_mode_of_education_id_fk", referencedColumnName = "mode_of_education_id")
    private ModeOfEducation graduationModeOfEducation;

    @ManyToOne
    @JoinColumn (name = "post_graduation_mode_of_education_id_fk", referencedColumnName = "mode_of_education_id")
    private ModeOfEducation postGraduationModeOfEducation;

    @ManyToOne
    @JoinColumn (name = "category_id_fk", referencedColumnName = "category_id")
    private Category category;

    @Column (name = "phone_no", length = 20)
    private String phoneNo;

    @Column (name = "email_id", length = 100)
    private String email;

    @Column (name = "current_ctc")
    private float currentCTC;

    @Column (name = "expected_ctc")
    private float expectedCTC;

    @Column (name = "resume_filename", length = 100)
    private String resumeFilename;

    @ManyToOne
    @JoinColumn (name = "candidate_status_id_fk", referencedColumnName = "candidate_status_id")
    private CandidateStatus candidateStatus;

    @Column (name = "candidate_upload_date")
    private Date candidateUploadDate;

    @ManyToOne
    @JoinColumn (name = "job_id_fk", referencedColumnName = "job_id")
    private Job job;

    @ManyToOne
    @JoinColumn (name = "employee_id_fk", referencedColumnName = "employee_id")
    private Employee employee;

    @ManyToOne
    @JoinColumn (name = "technical_screening_status_id_fk", referencedColumnName = "candidate_status_id")
    private CandidateStatus technicalScreeningStatus;

    @Column (name = "technical_screening_remarks", length = 100)
    private String technicalScreeningRemarks;

    @Column (name = "technical_interview_remarks", length = 1000)
    private String technicalInterviewRemarks;

    @Column (name = "screening_time")
    private Time screeningTime;

    @Column (name = "ctc_negotiation_remarks", length = 500)
    private String ctcNegotiationRemarks;

    @Column (name = "ctc_final")
    private float ctcFinal;

    @ManyToOne
    @JoinColumn (name = "ctc_approval_status_id_fk", referencedColumnName = "candidate_status_id")
    private CandidateStatus ctcApprovalStatus;

    @Column (name = "remarks", length = 500)
    private String remarks;

    @Column (name = "ctc_update_date")
    private Date ctcUpdateDate;

    @ManyToOne
    @JoinColumn (name = "client_interview_status_id_fk", referencedColumnName = "candidate_status_id")
    private CandidateStatus clientInterviewStatus;

    @Column (name = "client_interview_remarks", length = 500)
    private String clientInterviewRemarks;

    @ManyToOne
    @JoinColumn (name = "cv_formatting_status_id_fk", referencedColumnName = "candidate_status_id")
    private CandidateStatus cvFormattingStatus;

    @Column (name = "cv_submission_date")
    private Date cvSubmissionDate;

    @Column (name = "cv_submission_time")
    private Time cvSubmissionTime;

    @Column (name = "cv_formatting_remarks", length = 500)
    private String cvFormattingRemarks;

    @Column (name = "skills", length = 500)
    private String skills;

    public Candidate() {
    }

    public Candidate(String firstName, String lastName, Location location, float totalWorkExperience, Qualification graduationQualification, Qualification postGraduationQualification, Discipline graduationDiscipline, Discipline postGraduationDiscipline, Integer graduationYearOfPassing, Integer postGraduationYearOfPassing, ModeOfEducation graduationModeOfEducation, ModeOfEducation postGraduationModeOfEducation, Category category, String phoneNo, String email, float currentCTC, float expectedCTC, String resumeFilename, CandidateStatus candidateStatus, Date candidateUploadDate, Job job, Employee employee, CandidateStatus technicalScreeningStatus, String technicalScreeningRemarks, String technicalInterviewRemarks, Time screeningTime, String ctcNegotiationRemarks, float ctcFinal, CandidateStatus ctcApprovalStatus, String remarks, Date ctcUpdateDate, CandidateStatus clientInterviewStatus, String clientInterviewRemarks, CandidateStatus cvFormattingStatus, Date cvSubmissionDate, Time cvSubmissionTime, String cvFormattingRemarks, String skills) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.location = location;
        this.totalWorkExperience = totalWorkExperience;
        this.graduationQualification = graduationQualification;
        this.postGraduationQualification = postGraduationQualification;
        this.graduationDiscipline = graduationDiscipline;
        this.postGraduationDiscipline = postGraduationDiscipline;
        this.graduationYearOfPassing = graduationYearOfPassing;
        this.postGraduationYearOfPassing = postGraduationYearOfPassing;
        this.graduationModeOfEducation = graduationModeOfEducation;
        this.postGraduationModeOfEducation = postGraduationModeOfEducation;
        this.category = category;
        this.phoneNo = phoneNo;
        this.email = email;
        this.currentCTC = currentCTC;
        this.expectedCTC = expectedCTC;
        this.resumeFilename = resumeFilename;
        this.candidateStatus = candidateStatus;
        this.candidateUploadDate = candidateUploadDate;
        this.job = job;
        this.employee = employee;
        this.technicalScreeningStatus = technicalScreeningStatus;
        this.technicalScreeningRemarks = technicalScreeningRemarks;
        this.technicalInterviewRemarks = technicalInterviewRemarks;
        this.screeningTime = screeningTime;
        this.ctcNegotiationRemarks = ctcNegotiationRemarks;
        this.ctcFinal = ctcFinal;
        this.ctcApprovalStatus = ctcApprovalStatus;
        this.remarks = remarks;
        this.ctcUpdateDate = ctcUpdateDate;
        this.clientInterviewStatus = clientInterviewStatus;
        this.clientInterviewRemarks = clientInterviewRemarks;
        this.cvFormattingStatus = cvFormattingStatus;
        this.cvSubmissionDate = cvSubmissionDate;
        this.cvSubmissionTime = cvSubmissionTime;
        this.cvFormattingRemarks = cvFormattingRemarks;
        this.skills = skills;
    }
}
