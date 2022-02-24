import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'; // Vai salvar o model no banco de dados

// Agora será armazenado dentro da tabela de appointments
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid') // Coluna de chave primária gerada automaticamente
  id: string;

  @Column() // Coluna padrão
  provider: string;

  @Column('timestamp with time zone') // Coluna com data e hora
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
