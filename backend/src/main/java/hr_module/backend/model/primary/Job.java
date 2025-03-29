package hr_module.backend.model.primary;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Setter
@Getter
@Entity
@Table (name = "job")
public class Job {
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public JobTitle getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(JobTitle jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public float getMinimumWorkExperience() {
		return minimumWorkExperience;
	}

	public void setMinimumWorkExperience(float minimumWorkExperience) {
		this.minimumWorkExperience = minimumWorkExperience;
	}

	public float getMaximumWorkExperience() {
		return maximumWorkExperience;
	}

	public void setMaximumWorkExperience(float maximumWorkExperience) {
		this.maximumWorkExperience = maximumWorkExperience;
	}

	public Qualification getQualification() {
		return qualification;
	}

	public void setQualification(Qualification qualification) {
		this.qualification = qualification;
	}

	public Discipline getDiscipline() {
		return discipline;
	}

	public void setDiscipline(Discipline discipline) {
		this.discipline = discipline;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getDetailedJobDescription() {
		return detailedJobDescription;
	}

	public void setDetailedJobDescription(String detailedJobDescription) {
		this.detailedJobDescription = detailedJobDescription;
	}

	public String getRequiredSkillSets() {
		return requiredSkillSets;
	}

	public void setRequiredSkillSets(String requiredSkillSets) {
		this.requiredSkillSets = requiredSkillSets;
	}

	public Boolean getRequiredClientInterview() {
		return requiredClientInterview;
	}

	public void setRequiredClientInterview(Boolean requiredClientInterview) {
		this.requiredClientInterview = requiredClientInterview;
	}

	public Date getTdc() {
		return tdc;
	}

	public void setTdc(Date tdc) {
		this.tdc = tdc;
	}

	public Date getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(Date uploadDate) {
		this.uploadDate = uploadDate;
	}

	public JobStatus getJobStatus() {
		return jobStatus;
	}

	public void setJobStatus(JobStatus jobStatus) {
		this.jobStatus = jobStatus;
	}

	public Employee getInterviewer() {
		return interviewer;
	}

	public void setInterviewer(Employee interviewer) {
		this.interviewer = interviewer;
	}

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "job_id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "job_title_id_fk", referencedColumnName = "job_title_id")
    private JobTitle jobTitle;

    private String name;

    @ManyToOne
    @JoinColumn(name = "project_id_fk", referencedColumnName = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn (name = "location_id_fk", referencedColumnName = "location_id")
    private Location location;

    @Column (name = "minimum_work_experience")
    private float minimumWorkExperience;

    @Column (name = "maximum_work_experience")
    private float maximumWorkExperience;

    @ManyToOne
    @JoinColumn (name = "qualification_id_fk", referencedColumnName = "qualification_id")
    private Qualification qualification;

    @ManyToOne
    @JoinColumn (name = "discipline_id_fk", referencedColumnName = "discipline_id")
    private Discipline discipline;

    @ManyToOne
    @JoinColumn (name = "category_id_fk", referencedColumnName = "category_id")
    private Category category;

    @Column (name = "detailed_job_description", length = 2000)
    private String detailedJobDescription;

    @Column (name = "required_skill_sets", length = 500)
    private String requiredSkillSets;

    @Column (name = "required_client_interview")
    private Boolean requiredClientInterview;

    @Column (name = "tdc")
    private Date tdc;

    @Column (name = "job_upload_date")
    private Date uploadDate;

    @ManyToOne
    @JoinColumn (name = "job_status_id_fk", referencedColumnName = "job_status_id")
    private JobStatus jobStatus;

    @ManyToOne
    @JoinColumn (name = "interviewer_id_fk", referencedColumnName = "employee_id")
    private Employee interviewer;

    public Job() {
    }

    public Job(JobTitle jobTitle, Project project, Location location, float minimumWorkExperience, float maximumWorkExperience, Qualification qualification, Discipline discipline, Category category, String detailedJobDescription, String requiredSkillSets, Boolean requiredClientInterview, Date tdc, Date uploadDate, JobStatus jobStatus, Employee interviewer) {
        this.jobTitle = jobTitle;
        this.project = project;
        this.location = location;
        this.minimumWorkExperience = minimumWorkExperience;
        this.maximumWorkExperience = maximumWorkExperience;
        this.qualification = qualification;
        this.discipline = discipline;
        this.category = category;
        this.detailedJobDescription = detailedJobDescription;
        this.requiredSkillSets = requiredSkillSets;
        this.requiredClientInterview = requiredClientInterview;
        this.tdc = tdc;
        this.uploadDate = uploadDate;
        this.jobStatus = jobStatus;
        this.interviewer = interviewer;
        this.name = jobTitle != null ? jobTitle.getName() : null;
    }

    @PostLoad
    @PostPersist
    @PostUpdate
    public void setName() {
        if (this.jobTitle != null) {
            this.name = this.jobTitle.getName();
        }
    }
}
