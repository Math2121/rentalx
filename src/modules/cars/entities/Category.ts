import {v4 as uuidv4} from 'uuid'
import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm"

@Entity("Categories")
class Category {
  @Column()
  name: string;
  @Column()
  description: string;
  @CreateDateColumn()
  created_at: Date;

  @PrimaryColumn()
  id?: string;

  constructor() {
      if(!this.id){
        this.id = uuidv4()
      }
  }
}

export { Category };
