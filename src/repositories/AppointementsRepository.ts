import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // findByDate() não é um método nativo do typeorm, por isso foi criado um repositório com essa regra.
  // Mas quando os métodos utilizados forem somente os padrões, basta criá-los nos services.
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date: date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
