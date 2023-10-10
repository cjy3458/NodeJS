const Sequelize = require("sequelize");
//User 모델을 만들고 모듈로 exports
//User 모델은 Sequelize.Model을 확장한 클래스로 선언
class User extends Sequelize.Model {
  //모델은 크게 static initiate 메서드와 static associate 메서드로 나뉘어짐.
  //static initiate 메서드: 테이블에 대한 설정
  static initiate(sequelize) {
    //모델.init 메서드: 1번째 인수-테이블 컬럼에 대한 설정,2번째인수-테이블 자체에 대한 설정
    //시퀄라이즈는 알아서 id를 기본 키로 연결하므로 id 컬럼은 적어줄 필요가 없습니다.

    User.init(
      {
        //MySQL 테이블과 컬럼 내용이 일치해야 정확하게 대응됩니다.
        //시퀄라이즈의 자료형은 MySQL의 자료형과는 조금 다릅니다.
        //VARCHAR는 STRING으로, INT는 INTEGER로, TINYINT는 BOOLEAN으로, DATETIME은 DATE로 적음
        name: {
          type: Sequelize.STRING(20),
          allowNull: false, //allowNull은 NOT NULL 과 동일
          unique: true, // unique는 UNIQUE 옵션입니다.
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED, //UNSIGNED 옵션이 적용된 INT
          //여기에 ZEROFILL 옵션도 사용하고 싶다면 INTEGER.UNSIGNED.ZEROFILL을 적습니다.
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW, //defaultValue는 기본값(DEFAULT)을 의미합니다.
          //Sequelize.NOW: SQL의 now()와 같으며 현재 시간을 기본값으로 사용한다.
        },
      },
      {
        //모델.init 메서드의 두 번째 인수는 테이블 옵션입니다.
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  //static associate 메서드: 다른 모델과의 관계를 적음.
  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
  }
}
module.exports = User;
