import { Entity } from '@/core/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'

enum JobStatus {
  draft,
  published,
  archived,
  rejected,
}

export interface JobProps {
  companyId: UniqueEntityID
  title: string
  description: string
  location: string
  notes?: string | null
  status: JobStatus
  createdAt: Date
  updatedAt?: Date
}

export class Job extends Entity<JobProps> {
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

  set status(value: JobStatus) {
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
    data: Optional<JobProps, 'createdAt' | 'status'>,
    id?: UniqueEntityID,
  ) {
    const job = new Job(
      {
        ...data,
        status: data.status ?? JobStatus.draft,
        createdAt: data.createdAt ?? new Date(),
      },
      id,
    )

    return job
  }
}
