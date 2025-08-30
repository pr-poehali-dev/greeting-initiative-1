import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  certificateEarned: boolean;
  instructor: string;
  duration: string;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Основы веб-разработки",
    description: "Изучите HTML, CSS и JavaScript с нуля",
    category: "Программирование",
    progress: 75,
    totalLessons: 20,
    completedLessons: 15,
    certificateEarned: false,
    instructor: "Анна Петрова",
    duration: "6 недель"
  },
  {
    id: "2",
    title: "Дизайн-мышление",
    description: "Развивайте креативное мышление для решения задач",
    category: "Дизайн",
    progress: 100,
    totalLessons: 12,
    completedLessons: 12,
    certificateEarned: true,
    instructor: "Михаил Иванов",
    duration: "4 недели"
  },
  {
    id: "3",
    title: "Цифровой маркетинг",
    description: "Современные инструменты продвижения в интернете",
    category: "Маркетинг",
    progress: 45,
    totalLessons: 16,
    completedLessons: 7,
    certificateEarned: false,
    instructor: "Елена Сидорова",
    duration: "8 недель"
  }
];

const Index = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const getCertificate = (course: Course) => {
    if (!course.certificateEarned) return;
    
    // Генерация сертификата
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;
    
    // Белый фон
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 800, 600);
    
    // Рамка
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, 760, 560);
    
    // Заголовок сертификата
    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#1e40af';
    ctx.textAlign = 'center';
    ctx.fillText('СЕРТИФИКАТ', 400, 120);
    ctx.fillText('О ПРОХОЖДЕНИИ КУРСА', 400, 160);
    
    // Название курса
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#374151';
    ctx.fillText(`"${course.title}"`, 400, 240);
    
    // Имя студента (заглушка)
    ctx.font = '24px Arial';
    ctx.fillText('Выдан студенту:', 400, 320);
    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = '#1e40af';
    ctx.fillText('Иван Петров', 400, 360);
    
    // Детали
    ctx.font = '18px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText(`Преподаватель: ${course.instructor}`, 400, 420);
    ctx.fillText(`Длительность: ${course.duration}`, 400, 450);
    ctx.fillText(`Дата выдачи: ${new Date().toLocaleDateString('ru-RU')}`, 400, 480);
    
    // Скачивание
    const link = document.createElement('a');
    link.download = `certificate-${course.id}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Icon name="BookOpen" size={32} className="text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">EduSpace</h1>
            </div>
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Курсы</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Прогресс</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Сертификаты</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Приветствие */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Развивайтесь вместе с нами
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Изучайте новые навыки, получайте знания от экспертов и 
            зарабатывайте сертификаты для своего профессионального роста
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <Icon name="BookOpen" size={24} className="text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-gray-600">Активных курсов</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <Icon name="Trophy" size={24} className="text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">1</p>
                <p className="text-gray-600">Сертификат получен</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={24} className="text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">73%</p>
                <p className="text-gray-600">Средний прогресс</p>
              </div>
            </div>
          </div>
        </div>

        {/* Курсы */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Ваши курсы</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-xs">
                      {course.category}
                    </Badge>
                    {course.certificateEarned && (
                      <Icon name="Award" size={20} className="text-yellow-500" />
                    )}
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Прогресс: {course.completedLessons}/{course.totalLessons} уроков</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Преподаватель: {course.instructor}</span>
                      <span>{course.duration}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="flex-1"
                            onClick={() => setSelectedCourse(course)}
                          >
                            Продолжить обучение
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{selectedCourse?.title}</DialogTitle>
                            <DialogDescription>
                              {selectedCourse?.description}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-gray-600 mb-2">
                                Прогресс обучения
                              </p>
                              <Progress value={selectedCourse?.progress} className="h-3" />
                              <p className="text-sm text-gray-600 mt-1">
                                {selectedCourse?.completedLessons}/{selectedCourse?.totalLessons} уроков завершено
                              </p>
                            </div>
                            <Button className="w-full">
                              <Icon name="Play" size={16} className="mr-2" />
                              Продолжить урок
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      {course.certificateEarned && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => getCertificate(course)}
                        >
                          <Icon name="Download" size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Сертификаты */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Получите официальный сертификат
              </h3>
              <p className="text-gray-600 max-w-2xl">
                После успешного завершения курса вы получите персональный сертификат, 
                который можно добавить в резюме и профиль LinkedIn
              </p>
            </div>
            <div className="hidden lg:block">
              <img 
                src="/img/3d1ae918-fa35-4fe1-a053-1e947770aab9.jpg" 
                alt="Пример сертификата" 
                className="w-48 h-36 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;