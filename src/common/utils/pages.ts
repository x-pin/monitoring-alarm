import { ApiProperty } from '@nestjs/swagger'

export class Pages {
  @ApiProperty({ description: '显示页数' })
  list: any[]

  @ApiProperty({ description: '每页显示条数' })
  total: number

  constructor(list: any[], total: number) {
    this.list = list
    this.total = total
  }
}
