import { Entity } from '@/core/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'

enum JobPostingStatus {
  draft,
  published,
  archived,
  rejected,
}

export interface JobPostingProps {
  companyId: UniqueEntityID
  title: string
  description: string
  location: string
  notes?: string | null
  status: JobPostingStatus
  createdAt: Date
  updatedAt?: Date
}

export class JobPosting extends Entity<JobPostingProps> {
  get companyId() {
    return this.props.companyId
  }

  get title() {
    return this.props.title
  }

  set title(value: string) {
    this.props.title = value
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(value: string) {
    this.props.description = value
    this.touch()
  }

  get location() {
    return this.props.location
  }

  set location(value: string) {
    this.props.location = value
    this.touch()
  }

  get notes() {
    return this.props.notes
  }

  set notes(value: string | undefined | null) {
    this.props.notes = value
    this.touch()
  }

  get status() {
    return this.props.status
  }

  set status(value: JobPostingStatus) {
    this.props.status = value
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    data: Optional<JobPostingProps, 'createdAt' | 'status'>,
    id?: UniqueEntityID,
  ) {
    const jobPosting = new JobPosting(
      {
        ...data,
        status: data.status ?? JobPostingStatus.draft,
        createdAt: data.createdAt ?? new Date(),
      },
      id,
    )

    return jobPosting
  }
}
