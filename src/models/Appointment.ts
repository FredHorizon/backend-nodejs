import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'; // Vai salvar o model no banco de dados

import User from './User';

// Agora será armazenado dentro da tabela de appointments
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid') // Coluna de chave primária gerada automaticamente
  id: string;

  @Column() // Coluna padrão
  provider_id: string;

  // Config relação entre agendamentos e usuários, nesse caso: muitos agendamentos para um usuário
  @ManyToOne(() => User) // Qual o model da relação
  @JoinColumn({ name: 'provider_id' }) // Qual coluna vai identificar a relação, o prestador desse agendamento
  provider: User;

  @Column('timestamp with time zone') // Coluna com data e hora
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
