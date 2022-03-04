import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'; // Vai salvar o model no banco de dados

// Agora será armazenado dentro da tabela de appointments
@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid') // Coluna de chave primária gerada automaticamente
  id: string;

  @Column() // Coluna padrão
  name: string;

  @Column() // Coluna padrão
  email: string;

  @Column() // Coluna padrão
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
